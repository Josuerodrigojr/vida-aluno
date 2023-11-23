const bd = require('../bancoDeDados/bancoDeDados')


const buscarProfessorPor = async(busca)=>{

    return await bd('professores').where(busca).first()
}

const buscarComportamentoAluno = async(cpf)=>{
    return await bd.column('comportamento', 'media1', 'media2', 'media3', 'media4', 'observacao', 'materia').select().from('caderneta').where({cpf})
}

const buscarAlunosPor = async(busca)=>{

    return await bd('alunos').where(busca).first()

}

const buscarAlunos = async()=>{
    return await bd('alunos').returning("*")
}

const buscarComportamentoPor = async(busca)=>{

    return await bd('caderneta').where(busca)
}

const buscarTurma = async(turma)=>{
    return await bd.column('primeironome', 'segundonome', 'turma', 'email').select().from('alunos').where(turma)

}




module.exports = {buscarProfessorPor, buscarComportamentoAluno, buscarAlunos, buscarAlunosPor, buscarComportamentoPor, buscarTurma}


