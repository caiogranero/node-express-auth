const baseUrl = '/api/user';
const HttpStatusCode = require('../utils/HttpStatusCode');
const UserController = require('../controller/UserController');

module.exports = (app) => {
  const userController = new UserController();

  app.post(baseUrl, (req, res) => {
    const userPromise = userController.CreateUser(req.body);

    userPromise.then((user) => {
      res.status(HttpStatusCode.Success.get()).send({ data: user.id });
    }, (error) => {
      res.status(HttpStatusCode.InternalServerError.get()).send({ error: error.message });
    });
  });
};
