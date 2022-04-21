const categoriesService = require('../services/categoriesService');

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const created = await categoriesService.create(name);
    
    return res.status(201).json(created);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  create,
};