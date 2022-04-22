const postService = require('../services/postService');

const ERROR = { message: 'Erro no Servidor' };

const create = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user.data;

    const created = await postService.create({ title, content, categoryIds, userId });

    return res.status(201).json(created);
  } catch (err) {
    console.log(err);
    return res.status(500).json(ERROR);
  }
};

const getAll = async (_req, res) => {
  try {
    const post = await postService.getAll();
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(ERROR);
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
    return res.status(500).json(ERROR);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categoryIds } = req.body;

    if (categoryIds) {
      return res.status(400).json({ message: 'Categories cannot be edited' });
    }

    const PostByID = await postService.update({ title, content, id });

    return res.status(200).json(PostByID);
  } catch (err) {
    return res.status(500).json(ERROR);
  }
};

const remove = async (req, res) => {
  try {
  const { id } = req.params;

  await postService.remove(id);

  return res.status(204).end();
} catch (err) {
  console.log(err);
  return res.status(500).json(ERROR);
}
};

const getByQuery = async (req, res) => {
  try {
    const { q: term } = req.query;
    console.log(term);
    const post = await postService.getByQuery(term);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(ERROR);
  }
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  remove,
  getByQuery,
};