const bd = require('../bancoDeDados/bancoDeDados')


const buscarProfessorPor = async(busca)=>{

    return await bd('professores').where(busca).first()
}

const buscarComportamentoAluno = async(id)=>{
    return await bd.column('comportamento', 'media1', 'media2', 'media3', 'media4', 'observacao', 'materia').select().from('caderneta').where({id_aluno: id})
}

const buscarAlunosPor = async(busca)=>{
    return await bd('alunos').where(busca).first()

}

const buscarAlunos = async()=>{
    return await bd('alunos').returning("*")
}

module.exports = {buscarProfessorPor, buscarComportamentoAluno, buscarAlunos, buscarAlunosPor}


