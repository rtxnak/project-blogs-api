const express = require('express');

const categoriesController = require('../controllers/categoriesController');

const {
  authMiddleware,
} = require('../middlewares/authMiddleware');

const {
  isValidName,
} = require('../middlewares/categoriesValidations');

const routes = express.Router();

routes
  .get('/',
    authMiddleware,
    categoriesController.getAll)
  .post('/',
    authMiddleware,
    isValidName,
    categoriesController.create);

module.exports = routes;