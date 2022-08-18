const mysql = require('mysql2');

const sequelize = require('./database');

// Import Sequelize Model for Sync
// eslint-disable-next-line no-unused-vars
const WordFreq = require('../models/docs');

const serverConnection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: 3306,
  user: process.env.USER,
  password: process.env.PASSWORD,
  charset: 'utf8mb4',
});

async function createDb() {
  serverConnection.connect(async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Succesfull connection with server!');
      await serverConnection.promise().query('CREATE DATABASE IF NOT EXISTS word_frequency CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;')
        .then(([response]) => {
          console.log(response);
        })
        .catch(console.log);
      console.log('Database enabled');
      await sequelize
        .sync()
        .then(console.log('Table word_frequencies ready'))
        .catch((seqErr) => {
          console.log(seqErr);
        });
      serverConnection.end();
      process.exit();
    }
  });
}

createDb();
