const bd = require('../bancoDeDados/bancoDeDados')


const buscarProfessorPor = async(busca)=>{

    return await bd('professores').where(busca).first()
}

const buscarComportamentoAluno = async(id)=>{
    return await bd.column('comportamento', 'media1', 'media2', 'media3', 'media4', 'observacao', 'materia').select().from('caderneta').where({id_aluno: id})
}

module.exports = {buscarProfessorPor, buscarComportamentoAluno}


