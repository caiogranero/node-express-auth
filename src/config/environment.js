module.exports = {
  application: {
    application: {
      port: 1234,
      secret: 'auth-nodejs',
    },
  },

  production() {
    return Object.assign({}, this.application, {
      db: {
        name: 'prod_db',
        uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/',
      },
    });
  },

  development() {
    return Object.assign({}, this.application, {
      db: {
        name: 'dev_db',
        uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/',
      },
    });
  },

  test() {
    return Object.assign({}, this.application, {
      db: {
        name: 'test_db',
        uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/',
      },
    });
  },

  getSetup(env) {
    switch (env) {
      case 'production':
        return this.production();
      case 'development':
        return this.development();
      case 'test':
        return this.test();
      default:
        return this.development();
    }
  },
};
