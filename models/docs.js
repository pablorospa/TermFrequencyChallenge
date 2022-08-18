const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const WordFreq = sequelize.define('word_frequencies', {
  file: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  word: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  frequency: {
    type: Sequelize.INTEGER,
  },
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_spanish_ci',
});

module.exports = WordFreq;
