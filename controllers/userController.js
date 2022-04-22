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

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const userByID = await userService.findById(id);

    if (!userByID) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(userByID);
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const remove = async (req, res) => {
  try {
  const { id } = req.user.data;

  await userService.remove(id);

  return res.status(204).end();
} catch (err) {
  console.log(err);
  return res.status(500).json({ message: 'Erro no Servidor' });
}
};

module.exports = {
  getAll,
  create,
  findById,
  remove,
};