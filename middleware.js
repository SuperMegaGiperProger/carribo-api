const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const header = req.headers['x-access-token'] || req.headers['authorization'];
 
    if (header) {
      const token = header;

      req.token = token;
      next();
    } else {
      res.sendStatus(403);
    }
  };
  
module.exports = {
    checkToken: checkToken
}