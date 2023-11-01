const bd = require("../bancoDeDados/bancoDeDados");


const cadastrarProfessor = async(primeiroNome, segundoNome, turmas, materia, email, senha)=>{

   return  await bd('professores').insert([
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

const cadastrarAluno = async(primeiroNome, segundoNome, turma, email, senha, cpf)=>{

  return  await bd('alunos').insert([
   {
     primeironome: primeiroNome,
     segundonome: segundoNome,
     turma,
     cpf,
     email,
     senha
   }
 ]).returning('*')

}

module.exports = {cadastrarProfessor, cadastrarAluno}