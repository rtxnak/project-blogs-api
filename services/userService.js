const { User } = require('../models');

const ERROR = { error: 500, message: 'Erro no Servidor' };

const getAll = async () => {
  try {
    const user = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    return user;
  } catch (err) {
    return ERROR;
  }
};

const create = async (user) => {
  try {
    const { displayName, email, password, image } = user;

    const created = await User.create({ displayName, email, password, image });
    
    return created;
  } catch (err) {
    return ERROR;
  }
};

const findEmail = async (email) => {
  try {
    const verifyEmail = await User.findOne({
      where: { email },
    });
    return verifyEmail;
  } catch (err) {
    return null;
  }
};

const findById = async (id) => {
  try {
    const userByID = await User.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    return userByID;
  } catch (err) {
    return ERROR;
  }
};

const remove = async (id) => {
  try {
    await User.destroy({ where: { id } });
  } catch (err) {
    console.log(err);
    return ERROR;
  }
};

module.exports = {
  getAll,
  create,
  findEmail,
  findById,
  remove,
};