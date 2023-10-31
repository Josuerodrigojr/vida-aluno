const bd = require("../bancoDeDados/bancoDeDados");


const cadastrarProfessor = async(primeiroNome, segundoNome, turmas, materia, email, senha)=>{

    
   return bd('professores').insert([
    {
      primeironome: primeiroNome,
      segundonome: segundoNome,
      turmas,
      materia,
      email,
      senha
    }
  ]).returning('*')

}

module.exports = {cadastrarProfessor}