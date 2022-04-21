const { Categories } = require('../models');

const ERROR = { error: 500, message: 'Erro no Servidor' };

const create = async (category) => {
  try {
    const created = await Categories.create({ name: category });
    
    return created;
  } catch (err) {
    return ERROR;
  }
};

module.exports = {
  create,
};