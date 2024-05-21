const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {buscarProfessorPor} = require('../banco/select')

const login = async (req, res) => {
    const { email, senha } = req.body;


    try {
      const usuario = await buscarProfessorPor({ email });
      console.log(usuario);

  
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuario não encontrado" });
      }
  
      // const senhaValidada = await bcrypt.compare(senha, usuario.senha);
  
      // if (!senhaValidada) {
      //   return res.status(400).json({ mensagem: "Senha inválida" });
      // }
  
      // const tokenGerado = jwt.sign({ id: usuario.id }, process.env.JWT_HASH, { expiresIn: '8h' });
  
  
      const { senha: _, id, ...dadosUsuario } = usuario;
  
  
      return res.status(200).json({
        usuario: dadosUsuario
      });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  }
  
  module.exports = { login }
