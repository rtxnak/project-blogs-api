const categoriesService = require('../services/categoriesService');
const postService = require('../services/postService');

const isValidTitle = (req, res, next) => {
  const { title } = req.body;

  if (title === undefined) {
    return res.status(400).json(
      { message: '"title" is required' },
    );
  }

  next();
};

const isValidContent = (req, res, next) => {
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json(
      { message: '"content" is required' },
    );
  }

  next();
};

const isValidCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (categoryIds === undefined) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }

  const resultArray = [];
  await Promise.all(categoryIds.map(async (categoryId) => {
    const categoryRegistred = await categoriesService.findById(categoryId);
    if (categoryRegistred) {
      resultArray.push(true);
    } else {
      resultArray.push(false);
    }
  }));

  const exist = resultArray.some((result) => result === false);

  if (exist) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }

  next();
};

const userBlogPostAuthorization = async (req, res, next) => {
  const { id: userId } = req.user.data;
  const { id } = req.params;

  const PostByID = await postService.findById(id);

    if (!PostByID) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (userId !== PostByID.dataValues.userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

module.exports = {
  isValidTitle,
  isValidContent,
  isValidCategoryIds,
  userBlogPostAuthorization,
  // blogPostValidation,
};