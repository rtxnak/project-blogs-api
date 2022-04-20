const userService = require('../services/userService');

const isValidDisplayName = (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }

  next();
};

const isValidPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json(
      { message: '"password" is required' },
    );
  }

  if (password.length !== 6) {
    return res.status(400).json(
      { message: '"password" length must be 6 characters long' },
    );
  }

  next();
};

const isValidEmail = async (req, res, next) => {
  const { email } = req.body;

  const isRegisteredEmail = await userService.findEmail(email);

  if (isRegisteredEmail) {
    return res.status(409).json({ message: 'User already registered' });
  }

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }

  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const validateEmail = (e) => e.match(pattern);

  if (!validateEmail(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

module.exports = {
  isValidDisplayName,
  isValidPassword,
  isValidEmail,
};
