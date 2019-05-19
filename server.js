require('module-alias/register');

const express = require('express');
const serverConfig = require('@config/server');

const app = express();
const middleware = require('@middleware');

middleware(app, express);

app.listen(serverConfig.port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${serverConfig.port}`);
});
