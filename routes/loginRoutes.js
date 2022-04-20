const express = require('express');

const loginController = require('../controllers/loginController');

const {
  isValidPassword,
  isValidEmail,
} = require('../middlewares/loginValidation');

const routes = express.Router();

routes
  .post('/',
    isValidPassword,
    isValidEmail,
    loginController.login);

module.exports = routes;