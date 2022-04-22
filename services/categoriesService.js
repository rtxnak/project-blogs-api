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

const getAll = async () => {
  try {
    const allCategories = await Categories.findAll();
    return allCategories;
  } catch (err) {
    return ERROR;
  }
};

const findById = async (id) => {
  try {
    const categoryByID = await Categories.findOne({
      where: { id },
    });
    return categoryByID;
  } catch (err) {
    return ERROR;
  }
};

module.exports = {
  create,
  getAll,
  findById,
};