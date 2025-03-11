const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const express = require('express');
const app = express();

app.use(express.json());

let users = [];
let vaults = [];

let apiRouter = express.Router();
app.use('/api', apiRouter);

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  users.push({ username, password });
  writeUsers(users);

  res.status(200).json({ msg: 'User registered successfully' });
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
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

//GetVault gets the vault for the current user
apiRouter.get('/vault', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    res.send(vaults[user.email]); //might need to update this line
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

//GetPic gets a pic from the third party api for the button images

//PutVault updates the vault for the current user

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  users.push(user);

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