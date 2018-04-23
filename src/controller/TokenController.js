const User = require('../models/User');
const jwt = require('jsonwebtoken');

class TokenController {
  constructor(tokenKey) {
    this.tokenKey = tokenKey;
  }

  GetToken(request) {
    return User.findOne({
      name: request.name,
    }).then((user) => {
      const payload = { name: user.name, id: user.id };

      const token = jwt.sign(payload, this.tokenKey, {
        expiresIn: '24h',
      });

      return Promise.resolve(token);
    }).catch(error => Promise.reject(error));
  }

  ValidateToken(token) {
    return jwt.verify(token, this.tokenKey, (err) => {
      if (err) {
        return Promise.reject(err);
      }
      return Promise.resolve(true);
    });
  }
}

module.exports = TokenController;
