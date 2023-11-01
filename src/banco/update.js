const bd = require('../bancoDeDados/bancoDeDados')


const atualizarProfessor = async ( id,primeiroNome, segundoNome, turmas, materia, email, senha)=>{
    console.log(id,primeiroNome, segundoNome, turmas, materia, email, senha)
    return await bd('professores').where({id}).update({
        primeironome: primeiroNome,
        segundonome: segundoNome, 
        turmas, 
        materia, 
        email, 
        senha
    }).returning('*')
}

const atualizarAluno = async ( id,primeiroNome, segundoNome, turma, email, senha, cpf)=>{
    
    return await bd('alunos').where({id}).update({
        primeironome: primeiroNome,
        segundonome: segundoNome, 
        turma, 
        cpf, 
        email, 
        senha
    }).returning('*')
}

module.exports = {atualizarProfessor, atualizarAluno}