const express = require('express');

const postController = require('../controllers/postController');

const {
  authMiddleware,
} = require('../middlewares/authMiddleware');

const {
  isValidTitle,
  isValidContent,
  isValidCategoryIds,
} = require('../middlewares/postValidations');

const routes = express.Router();

routes
  .get('/:id',
    authMiddleware,
    postController.findById)
  .get('/',
    authMiddleware,
    postController.getAll)
  .post('/',
    authMiddleware,
    isValidTitle,
    isValidContent,
    isValidCategoryIds,
    postController.create);

module.exports = routes;