const PublicController = require('../features/public/public.controller');
const authMiddleware = require('../shared/middleware/authentication').isAuth

const registerPublicRoutes = (app) => {
  app.post('/contact', PublicController.contactUs);

  app.get('/calc-residential', PublicController.calculateResidentialQuote);
}

module.exports = {registerPublicRoutes};