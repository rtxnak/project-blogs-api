const Sequelize = require('sequelize');
const { BlogPosts, PostsCategories, User, Categories } = require('../models');

const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const ERROR = { error: 500, message: 'Erro no Servidor' };

const create = async ({ title, content, userId, categoryIds }) => {
  const timestamp = new Date().toJSON();

  try {
    const result = await sequelize.transaction(async (transaction) => {
      const createdPost = await BlogPosts.create(
        { userId, title, content, published: timestamp, updated: timestamp }, { transaction },
      );
      await Promise.all(
        await categoryIds.map((categoryId) => PostsCategories.create(
          { postId: createdPost.dataValues.id, categoryId }, { transaction },
        )),
      );
      return createdPost;
    });
    return result;
  } catch (err) {
    return ERROR;
  }
};

const getAll = async () => {
  try {
    const post = await BlogPosts.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
    });
    return post;
  } catch (err) {
    return ERROR;
  }
};

const findById = async (id) => {
  try {
    const post = await BlogPosts.findOne({
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Categories, as: 'categories', through: { attributes: [] } },
    ],
    });
    return post;
  } catch (err) {
    return ERROR;
  }
};

module.exports = {
  create,
  getAll,
  findById,
};