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

module.exports = {
  getAll,
};