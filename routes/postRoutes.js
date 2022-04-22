const express = require('express');

const postController = require('../controllers/postController');

const {
  authMiddleware,
} = require('../middlewares/authMiddleware');

const {
  isValidTitle,
  isValidContent,
  isValidCategoryIds,
  userBlogPostAuthorization,
} = require('../middlewares/postValidations');

const routes = express.Router();

routes
  .delete('/:id',
    authMiddleware,
    userBlogPostAuthorization,
    postController.remove)
  .put('/:id',
    authMiddleware,
    userBlogPostAuthorization,
    isValidTitle,
    isValidContent,
    postController.update)
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