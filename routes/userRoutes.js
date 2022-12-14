const express = require('express');

const userController = require('../controllers/userController');

const {
  isValidDisplayName,
  isValidPassword,
  isValidEmail,
} = require('../middlewares/userValidation');

const {
  authMiddleware,
} = require('../middlewares/authMiddleware');

const routes = express.Router();

routes
  .delete('/me',
    authMiddleware,
    userController.remove)
  .get('/:id',
    authMiddleware,
    userController.findById)
  .get('/',
    authMiddleware,
    userController.getAll)
  .post('/',
    isValidDisplayName,
    isValidPassword,
    isValidEmail,
    userController.create);

module.exports = routes;