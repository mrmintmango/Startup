const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const express = require("express");
const DB = require("./database.js");
const { peerProxy } = require("./peerProxy.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

const authCookieName = "token";

let apiRouter = express.Router();
app.use("/api", apiRouter);

const PORT = process.argv.length > 2 ? process.argv[2] : 4000;

// Endpoint to fetch game details by name
app.get("/api/games/:name", async (req, res) => {
  const gameName = req.params.name;
  const user = await findUser("token", req.cookies[authCookieName]);

  try {
    // Query the database for the game in videoGames, boardGames, or cardGames
    const videoGame = await DB.getVideoGameByName(user, gameName);
    const boardGame = await DB.getBoardGameByName(user, gameName);
    const cardGame = await DB.getCardGameByName(user, gameName);

    // Check which collection contains the game
    const game = videoGame || boardGame || cardGame;

    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ msg: "Game not found" });
    }
  } catch (error) {
    console.error("Error fetching game details:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// CreateAuth a new user
apiRouter.post("/auth/create", async (req, res) => {
  if (await findUser("username", req.body.username)) {
    res.status(409).send({ msg: "Existing user" });
  } else {
    const user = await createUser(req.body.username, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ username: user.username });
  }
});

// GetAuth login an existing user
apiRouter.post("/auth/login", async (req, res) => {
  const user = await findUser("username", req.body.username);
  if (user && user.password) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ username: user.username });
      return;
    }
  }
  res.status(401).send({ msg: "Unauthorized" });
});

// DeleteAuth logout a user
apiRouter.delete("/auth/logout", async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
};

// Get the friends list for the current user
apiRouter.get("/auth/friends", verifyAuth, async (req, res) => {
  try {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);

    if (user) {
      res.json({ friends: user.friends || [] }); // Assuming the user's document has a "friends" array
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching friends list:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

// Get the current user's name
apiRouter.get("/auth/currentUser", verifyAuth, async (req, res) => {
  try {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);

    if (user) {
      res.json({ username: user.username }); // Return the current user's name
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

// Add a new friend to the user's friends list
apiRouter.put("/auth/friends", verifyAuth, async (req, res) => {
  try {
    const user = await DB.getUserByToken(req.cookies[authCookieName]);
    if (user) {
      const newFriend = req.body;

      // Check if the friend exists in the database
      const friendExists = await DB.getUser(newFriend.name);
      if (!friendExists) {
        return res.status(404).send({ msg: "User not found" });
      }

      // Ensure the friends list exists
      if (!user.friends) {
        user.friends = [];
      }
      user.friends.push(newFriend);
      await DB.updateUser(user);
      res.status(200).send({ msg: "Friend added successfully" });
    } else {
      res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).send({ msg: "Internal server error" });
  }
});

// GetVault gets the vault for the current user
apiRouter.get("/auth/vault", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    res.send({
      videoGames: user.videoGames,
      boardGames: user.boardGames,
      cardGames: user.cardGames,
    });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// PutVault updates the vault for the current user
apiRouter.put("/auth/vault", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.videoGames = req.body.videoGames;
    user.boardGames = req.body.boardGames;
    user.cardGames = req.body.cardGames;
    DB.updateUser(user);
    res.send({ msg: "Vault updated" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Add a new game to the video games list
apiRouter.put("/auth/videoGames", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.videoGames.push(req.body);
    DB.updateUser(user);
    res.send({ msg: "Video game added" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Add a new game to the board games list
apiRouter.put("/auth/boardGames", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.boardGames.push(req.body);
    DB.updateUser(user);
    res.send({ msg: "Board game added" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Add a new game to the card games list
apiRouter.put("/auth/cardGames", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.cardGames.push(req.body);
    DB.updateUser(user);
    res.send({ msg: "Card game added" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Update a video game in the video games list
apiRouter.put("/auth/updateVideoGame", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.videoGames = user.videoGames.map((game) => {
      if (game.name === req.body.name) {
        return { ...game, ...req.body };
      } else {
        return game;
      }
    });
    DB.updateUser(user);
    res.send({ msg: "Video game updated" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Update a board game in the board games list
apiRouter.put("/auth/updateBoardGame", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.boardGames = user.boardGames.map((game) => {
      if (game.name === req.body.name) {
        return { ...game, ...req.body };
      } else {
        return game;
      }
    });
    DB.updateUser(user);
    res.send({ msg: "Board game updated" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Update a card game in the card games list
apiRouter.put("/auth/updateCardGame", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.cardGames = user.cardGames.map((game) => {
      if (game.name === req.body.name) {
        return { ...game, ...req.body };
      } else {
        return game;
      }
    });
    DB.updateUser(user);
    res.send({ msg: "Card game updated" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Delete a video game from the video games list
apiRouter.delete("/auth/deleteVideoGame", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.videoGames = user.videoGames.filter(
      (game) => game.name !== req.body.name
    );
    DB.updateUser(user);
    res.send({ msg: "Video game deleted" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Delete a board game from the board games list
apiRouter.delete("/auth/deleteBoardGame", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.boardGames = user.boardGames.filter(
      (game) => game.name !== req.body.name
    );
    DB.updateUser(user);
    res.send({ msg: "Board game deleted" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Delete a card game from the card games list
apiRouter.delete("/auth/deleteCardGame", verifyAuth, async (req, res) => {
  const user = await findUser("token", req.cookies[authCookieName]);
  if (user) {
    user.cardGames = user.cardGames.filter(
      (game) => game.name !== req.body.name
    );
    DB.updateUser(user);
    res.send({ msg: "Card game deleted" });
  } else {
    res.status(401).send({ msg: "Unauthorized" });
  }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile("index.html", { root: "public" });
});

async function createUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    token: uuid.v4(),
    videoGames: [],
    boardGames: [],
    cardGames: [],
    friends: [],
  };
  await DB.addUser(user); // Save the user to the database

  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === "token") {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
  });
}

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; connect-src 'self' ws://localhost:4000"
  );
  next();
});

const httpService = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

peerProxy(httpService);
