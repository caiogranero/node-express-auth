const baseUrl = '/api/token';
const HttpStatusCode = require('../utils/HttpStatusCode');
const TokenController = require('../controller/TokenController');

module.exports = (app) => {
  const tokenController = new TokenController(app.get('superSecret'));

  app.get(baseUrl, (req, res) => {
    const tokenPromise = tokenController.GetToken(req.query);

    tokenPromise.then((token) => {
      res.status(HttpStatusCode.Success.get()).send({ data: token });
    }, (error) => {
      res.status(HttpStatusCode.InternalServerError.get()).send({ error: error.message });
    });
  });

  app.get(`${baseUrl}/hassession`, (req, res) => {
    const currentToken = req.body.token || req.query.token || req.headers['x-access-token'];
    const tokenPromise = tokenController.ValidateToken(currentToken);

    tokenPromise.then((response) => {
      res.status(HttpStatusCode.Success.get()).send({ data: response });
    }, (error) => {
      res.status(HttpStatusCode.InternalServerError.get()).send({
        data: false,
        error: error.message,
      });
    });
  });
};
