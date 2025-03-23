const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('theGameVault');
const userCollection = db.collection('users');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
    try {
      await db.command({ ping: 1 });
      console.log(`Connect to database`);
    } catch (ex) {
      console.log(`Unable to connect to database with ${url} because ${ex.message}`);
      process.exit(1);
    }
  })();

  function getUser(username) {
    return userCollection.findOne({ username: username });
  }
  
  function getUserByToken(token) {
    return userCollection.findOne({ token: token });
  }
  
  async function addUser(user) {
    await userCollection.insertOne(user);
  }
  
  async function getVideoGameByName(user, name) {
    const result = await userCollection.findOne({
      username: user.username, 'videoGames.name': name},
      { projection: { 'videoGames.$': 1 }}
    );
    return result && result.videoGames ? result.videoGames[0] : null;
  }
  
  async function getBoardGameByName(user, name) {
    const result = await userCollection.findOne(
      { username: user.username, 'boardGames.name': name },
      { projection: { 'boardGames.$': 1 } } // Only return the matching game
    );
    return result && result.boardGames ? result.boardGames[0] : null;
  }
  
  async function getCardGameByName(user, name) {
    const result = await userCollection.findOne(
      { username: user.username, 'cardGames.name': name },
      { projection: { 'cardGames.$': 1 } } // Only return the matching game
    );
    return result && result.cardGames ? result.cardGames[0] : null;
  }
  
  async function updateUser(user) {
    await userCollection.updateOne({ username: user.username }, { $set: user });
  }
  
  module.exports = {
    getUser,
    getUserByToken,
    addUser,
    getVideoGameByName,
    getBoardGameByName,
    getCardGameByName,
    updateUser
  };
  