/* eslint-disable no-console */

const Console = {
  log(message) {
    console.log(`${new Date().toLocaleString()} - ${message}`);
  },

  warn(message) {
    console.warn(`${new Date().toLocaleString()} - ${message}`);
  },

  info(message) {
    console.info(`${new Date().toLocaleString()} - ${message}`);
  },
};

module.exports = Console;
