const UserFactory = require('../models/factories/UserFactory');

class UserController {
  constructor() {
    this.userFactory = UserFactory;
  }

  CreateUser(request) {
    const user = this.userFactory.Create(request.name, request.password);

    return user.save()
      .then(document => Promise.resolve(document))
      .catch(error => Promise.reject(error));
  }
}

module.exports = UserController;
