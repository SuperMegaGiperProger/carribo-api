const express = require('express');
const serverConfig = require('./config/server');
const http = require('http');
const app = express();
const middleware = require('./middleware')(app, express);

// http.createServer(app).listen(serverConfig.port, () => {
//   log.info('Express server listening on port ' + serverConfig.port);
// });

app.listen(serverConfig.port, (err) => {
  if (err) {
      return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${serverConfig.port}`)
});
