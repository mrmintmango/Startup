const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const express = require('express');
const fs = require('fs');
const path = require('path');

const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('rental');
const collection = db.collection('house');


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const usersFilePath = path.join(__dirname, 'users.json');

const authCookieName = 'token';

// Helper function to write users to the file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Helper function to read users from the file
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const usersData = fs.readFileSync(usersFilePath);
  return JSON.parse(usersData);
};

// Initialize users from the file
let users = readUsers();

let apiRouter = express.Router();
app.use('/api', apiRouter);

const PORT = process.argv.length > 2 ? process.argv[2] : 4000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

// Endpoint to fetch game details by name
app.get('/api/games/:name', (req, res) => {
  const gameName = req.params.name;
  const users = readUsers();

  let game = null;
  for (const user of users) {
    game = user.videoGames.find(game => game.name === gameName) ||
           user.boardGames.find(game => game.name === gameName) ||
           user.cardGames.find(game => game.name === gameName);
    if (game) break;
  }

  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ msg: 'Game not found' });
  }
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('username', req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

apiRouter.post('/auth/register', (req, res) => {
  const { username, password } = req.body;

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ msg: 'User already exists' });
  }
  users.push({ username, password, videoGames: [], boardGames: [], cardGames: [] });
  writeUsers(users);

  res.status(200).json({ msg: 'User registered successfully' });
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('username', req.body.username);
  if (user && user.password) {
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetVault gets the vault for the current user
apiRouter.get('/auth/vault', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    res.send({ videoGames: user.videoGames, boardGames: user.boardGames, cardGames: user.cardGames });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// PutVault updates the vault for the current user
apiRouter.put('/auth/vault', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.videoGames = req.body.videoGames;
    user.boardGames = req.body.boardGames;
    user.cardGames = req.body.cardGames;
    writeUsers(users);
    res.send({ msg: 'Vault updated' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Add a new game to the video games list
apiRouter.put('/auth/videoGames', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.videoGames.push(req.body);
    writeUsers(users);
    res.send({ msg: 'Video game added' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Add a new game to the board games list
apiRouter.put('/auth/boardGames', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.boardGames.push(req.body);
    writeUsers(users);
    res.send({ msg: 'Board game added' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Add a new game to the card games list
apiRouter.put('/auth/cardGames', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.cardGames.push(req.body);
    writeUsers(users);
    res.send({ msg: 'Card game added' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Update a video game in the video games list
apiRouter.put('/auth/updateVideoGame', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.videoGames = user.videoGames.map((game) => {
      if (game.name === req.body.name) {
        return { ...game, ...req.body };
      } else {
        return game;
      }
    });
    writeUsers(users);
    res.send({ msg: 'Video game updated' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Update a board game in the board games list
apiRouter.put('/auth/updateBoardGame', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.boardGames = user.boardGames.map((game) => {
      if (game.name === req.body.name) {
        return { ...game, ...req.body };
      } else {
        return game;
      }
    });
    writeUsers(users);
    res.send({ msg: 'Board game updated' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Update a card game in the card games list
apiRouter.put('/auth/updateCardGame', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.cardGames = user.cardGames.map((game) => {
      if (game.name === req.body.name) {
        return { ...game, ...req.body };
      } else {
        return game;
      }
    });
    writeUsers(users);
    res.send({ msg: 'Card game updated' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Delete a video game from the video games list
apiRouter.delete('/auth/deleteVideoGame', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.videoGames = user.videoGames.filter((game) => game.name !== req.body.name);
    writeUsers(users);
    res.send({ msg: 'Video game deleted' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Delete a board game from the board games list
apiRouter.delete('/auth/deleteBoardGame', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.boardGames = user.boardGames.filter((game) => game.name !== req.body.name);
    writeUsers(users);
    res.send({ msg: 'Board game deleted' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Delete a card game from the card games list
apiRouter.delete('/auth/deleteCardGame', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    user.cardGames = user.cardGames.filter((game) => game.name !== req.body.name);
    writeUsers(users);
    res.send({ msg: 'Card game deleted' });
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    videoGames: [], // Initialize an empty video games list for the user
    boardGames: [], // Initialize an empty board games list for the user
    cardGames: [] // Initialize an empty card games list for the user
  };
  users.push(user);
  writeUsers(users);

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}