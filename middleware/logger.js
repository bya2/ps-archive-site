const pino = require('pino');
const express_pino = require('express-pino-logger');

const dev_opts = {
  prettyPrint: true,
};

const NODE_ENV = process.env.NODE_ENV;

let request_log;
let logger;

if (NODE_ENV === 'production') {
  request_log = express_pino();
  logger = pino(dev_opts);
} else {
  request_log = express_pino(dev_opts);
  logger = pino(dev_opts);
}

module.exports.request_log = request_log;
module.exports.logger = logger;