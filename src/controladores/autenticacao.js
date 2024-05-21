const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {buscarProfessorPor} = require('../banco/select')
const pool = require('../bancoDeDados/bancoDeDados')

const login = async (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha)


    try {
      const usuario = await pool.query(`SELECT * FROM professores WHERE email = '${email}' AND senha='${senha}'`)
      
      console.log(usuario.rows[0])
      const novoUsuario = usuario.rows[0];
      
      
      
      // const usuario = await buscarProfessorPor({ email });
      // console.log(usuario);

  
      if (usuario.rowCount<1) {
        return res.status(404).json({ mensagem: "Usuario não encontrado" });
      }
  
      // const senhaValidada = await bcrypt.compare(senha, usuario.senha);
  
      // if (!senhaValidada) {
      //   return res.status(400).json({ mensagem: "Senha inválida" });
      // }
  
      // const tokenGerado = jwt.sign({ id: usuario.id }, process.env.JWT_HASH, { expiresIn: '8h' });
  
  
      const { senha: _, id, ...dadosUsuario } = novoUsuario;
  
  
      return res.status(200).json({
        novoUsuario: dadosUsuario
      });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  }
  
  module.exports = { login }
