const bd = require('../bancoDeDados/bancoDeDados')


const excluirProfessor = async(id)=>{
    await bd('professores').where({id}).del()
}

const excluirAluno = async(id)=>{
    await bd('alunos').where({id}).del()
}


module.exports = {excluirProfessor, excluirAluno}