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

  app.post(`${baseUrl}/verify`, (req, res) => {
    const currentToken = req.headers['x-access-token'];
    const tokenPromise = tokenController.Verify(currentToken);

    tokenPromise.then((response) => {
      res.status(HttpStatusCode.Success.get()).send({ response });
    }, (error) => {
      res.status(HttpStatusCode.InternalServerError.get()).send({ error });
    });
  });

  app.post(`${baseUrl}/decode`, (req, res) => {
    const currentToken = req.headers['x-access-token'];
    const tokenPromise = tokenController.Decode(currentToken);

    tokenPromise.then((response) => {
      res.status(HttpStatusCode.Success.get()).send({ response });
    }, (error) => {
      res.status(HttpStatusCode.InternalServerError.get()).send({
        error,
      });
    });
  });
};
