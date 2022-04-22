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

const getAll = async (_req, res) => {
  try {
    const post = await postService.getAll();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const PostByID = await postService.findById(id);

    if (!PostByID) {
      return res.status(404).json({ message: 'Post does not exist' });
    }

    return res.status(200).json(PostByID);
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  create,
  getAll,
  findById,
};