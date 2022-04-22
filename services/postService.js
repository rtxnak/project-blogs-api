const Sequelize = require('sequelize');
const { BlogPosts, PostsCategories, User, Categories } = require('../models');

const { Op } = Sequelize;

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

const update = async ({ title, content, id }) => {
  try {
    const timestamp = new Date().toJSON();
    const PostByID = await BlogPosts.findByPk(id);

    PostByID.title = title;
    PostByID.content = content;
    PostByID.updated = timestamp;

    await PostByID.save();

    const post = await BlogPosts.findOne({
      where: { id },
      include: [
        { model: Categories, as: 'categories', through: { attributes: [] } },
      ],
      attributes: { exclude: ['id', 'published', 'updated'] },
    });

    return post;
  } catch (err) {
    return ERROR;
  }
};

const remove = async (id) => {
  try {
    await BlogPosts.destroy({ where: { id } });
  } catch (err) {
    console.log(err);
    return ERROR;
  }
};

const getByQuery = async (term) => {
  try {
    const query = `%${term}`;
    const post = await BlogPosts.findAll({
      where: {
        [Op.or]: {
          title: { [Op.like]: query },
          content: { [Op.like]: query },
        },
      },
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

// Utilização da Biblioteca OP - https://pt.stackoverflow.com/questions/355872/como-utilizar-o-like-do-sql-no-sequelize

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
  getByQuery,
};