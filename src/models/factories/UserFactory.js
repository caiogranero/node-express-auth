const User = require('../User');

const UserFactory = {
  Create(name, password) {
    return new User({ name, password });
  },
};

module.exports = UserFactory;
