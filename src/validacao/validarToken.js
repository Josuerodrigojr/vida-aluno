const jwt = require('jsonwebtoken');
const hash = process.env.JWT_HASH;


const { buscarProfessorPor } = require('../banco/select')

const validarToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "Usuário não autorizado" });
  }

  try {
    const token = authorization.split(' ')[1]

    const { id } = jwt.verify(token, hash);

    const user = await buscarProfessorPor({ id });

    if (!user) {
      return res.status(404).json({ mensagem: "Usuario não encontrado" });
    }

    const { senha: _, ...user_details } = user;
    req.usuario = user_details;
  } catch (e) {
    return res.status(403).json({ mensagem: "Erro no servidor" })
  }

  next();
};

module.exports = validarToken
