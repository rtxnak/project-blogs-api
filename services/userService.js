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

module.exports = {
  getAll,
  create,
  findEmail,
};