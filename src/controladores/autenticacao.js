const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {buscarProfessorPor} = require('../banco/select')
const pool = require('../bancoDeDados/bancoDeDados')

const login = async (req, res) => {
    const { email, senha } = req.body;



    try {
      const query = `SELECT * FROM professores WHERE email = '' OR '1'='1' AND senha='123' OR '1'='1' `;
      console.log(query)
      const usuario = await pool.query(query)
      
      
      const novoUsuario = usuario.rows;
      
      
      
      // const usuario = await buscarProfessorPor({ email });
      // console.log(usuario);

  
      if (usuario.rowCount<1) {
        return res.status(404).json({ mensagem: "Usuario não encontrado" });
      } else {
        const { senha: _, id, ...dadosUsuario } = novoUsuario;
  
  
      return res.status(200).json({
        novoUsuario: dadosUsuario
      });
      }
  
      // const senhaValidada = await bcrypt.compare(senha, usuario.senha);
  
      // if (!senhaValidada) {
      //   return res.status(400).json({ mensagem: "Senha inválida" });
      // }
  
      // const tokenGerado = jwt.sign({ id: usuario.id }, process.env.JWT_HASH, { expiresIn: '8h' });
  
  
      
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  }
  
  module.exports = { login }
