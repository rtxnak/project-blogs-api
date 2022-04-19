const userService = require('../services/userService');

const getAll = async (_req, res) => {
  try {
    const user = await userService.getAll();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  getAll,
};