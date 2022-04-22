const categoriesService = require('../services/categoriesService');

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

module.exports = {
  isValidTitle,
  isValidContent,
  isValidCategoryIds,
};