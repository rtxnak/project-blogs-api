const postService = require('../services/postService');

const create = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user.data;

    const created = await postService.create({ title, content, categoryIds, userId });

    return res.status(201).json(created);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  create,
};