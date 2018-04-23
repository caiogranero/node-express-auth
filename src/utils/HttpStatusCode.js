const Enum = require('./Enum');

const HttpStatusCode = Object.freeze({
  InternalServerError: new Enum('Ih, deu pau', 500),
  MissingBodyContent: new Enum('Missing body content', 400),
  Unauthorized: new Enum('You are not allowed', 401),
  Success: new Enum('Everythings go well', 200),
});

module.exports = HttpStatusCode;
