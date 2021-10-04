const express = require('express');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

(() => {
  const app = express();

  const server = app.listen(HTTP_PORT, () => console.log(`LISTENING:\nhttp://127.0.0.1:${HTTP_PORT}`));
})();