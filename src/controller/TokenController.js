const User = require('../models/User');
const jwt = require('jsonwebtoken');

class TokenController {
  constructor(tokenKey) {
    this.tokenKey = tokenKey;
  }

  GetToken(request) {
    return User.findOne({
      name: request.name,
      password: request.password,
    }).then((user) => {
      const payload = { name: user.name, id: user.id };

      const token = jwt.sign(payload, this.tokenKey, {
        expiresIn: '24h',
      });

      return Promise.resolve(token);
    }).catch(error => Promise.reject(error));
  }

  Verify(token) {
    return jwt.verify(token, this.tokenKey, (err) => {
      if (err) {
        return Promise.reject(Object.assign({ hasSession: false }, err));
      }
      return Promise.resolve({ hasSession: true });
    });
  }

  Decode(token) {
    return jwt.verify(token, this.tokenKey, (err, decoded) => {
      if (err) {
        return Promise.reject(err);
      }
      return Promise.resolve(decoded);
    });
  }
}

module.exports = TokenController;
