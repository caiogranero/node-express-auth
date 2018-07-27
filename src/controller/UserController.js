const UserFactory = require('../models/factories/UserFactory');

class UserController {
  constructor() {
    this.userFactory = UserFactory;
  }

  CreateUser({ name, password }) {
    const user = this.userFactory.Create(name, password);

    return user.save()
      .then(document => Promise.resolve(document))
      .catch(error => Promise.reject(error));
  }
}

module.exports = UserController;
