require('dotenv').config();
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const resultLogin = await loginService.findLogin(email, password);

    if (!resultLogin) {
    return res.status(400).json({ message: 'Invalid fields' });
    }

    const jwtConfig = { expiresIn: '3d', algorithm: 'HS256' };
    const token = jwt.sign({ data: resultLogin }, JWT_SECRET, jwtConfig);

    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro no Servidor' });
  }
};

module.exports = {
  login,
};