module.exports = {
  host    : process.env.DB__PG_HOST,
  user    : process.env.DB__PG_USER,
  password: process.env.DB__PG_PASSWORD,
  database: process.env.DB__PG_DB_NAME,
  port    : process.env.DB__PG_PORT,
  ssl     : {
    rejectUnauthorized: false,
  }
};