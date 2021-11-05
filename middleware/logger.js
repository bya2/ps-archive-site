const express_pino = require('express-pino-logger');
const pino = require('pino');

const NODE_ENV = process.env.NODE_ENV;

const dev_opts = {
  prettyPrint: true,
}

let request_logger;
let logger;

if (NODE_ENV === 'production') {
  request_logger = express_pino();
  logger = pino();
} else {
  request_log = express_pino(dev_opts);
  logger = pino(dev_opts);
}

module.exports = { request_logger, logger };