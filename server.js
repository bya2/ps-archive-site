const NODE_ENV = process.env.NODE_ENV;

const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), NODE_ENV == 'production' ? '.env' : '.env.dev')});

const app = require('./app');

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.log(`http://${HOST}:${PORT}/`);