const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.get('*', (_req, res) => {
  res.send({ msg: 'Hello Backend!' });
});

app.listen(port, () => {
  console.log(`Backend is listening on port ${port}`);
});