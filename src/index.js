/* eslint no-underscore-dangle: ["error", { "allow": ["_router"] }] */

const environment = require('./config/environment');
const app = require('./config/application');
const Console = require('./utils/Console');

const { application } = environment.getSetup();
const { port } = application;

const printRoutes = () => {
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      const { route } = r;
      const { path } = route;
      const allMethods = r.route.methods;
      const register = Object.keys(allMethods).filter(method => !!allMethods[method]);
      Console.log(`${path} - { ${register.join(',')} }`);
    }
  });
};

app.listen(port, () => {
  Console.log(`Server listen on port ${port}`);
  printRoutes();
});
