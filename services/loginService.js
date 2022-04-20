const { User } = require('../models');

// const ERROR = { error: 500, message: 'Erro no Servidor' };

const findLogin = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email, password } });
    return user;
  } catch (err) {
    return null;
  }
};

module.exports = {
  findLogin,
};