const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'word_frequency',
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: 3306,
    dialect: 'mysql',
    define: {
      timestamps: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_spanish_ci',
    },
    logging: false,
    dialectOptions: { connectTimeout: 60000 },
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
    },
  },
);

module.exports = sequelize;
