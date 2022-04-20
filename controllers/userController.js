const userService = require('../services/userService');

const getAll = async (_req, res) => {
  try {
    const user = await userService.getAll();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const created = await userService.create({ displayName, email, password, image });
    
    return res.status(201).json(created);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  getAll,
  create,
};