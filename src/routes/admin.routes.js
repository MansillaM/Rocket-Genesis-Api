const AdminController = require('../features/admin/admin.controller');
const authMiddleware = require('../shared/middleware/authentication').isAuth

const registerAdminRoutes = (app) => {
  app.get('/email-list', authMiddleware, AdminController.emailList);

  app.get('/region-avg', authMiddleware, AdminController.regionAverage);
}

module.exports = {registerAdminRoutes};