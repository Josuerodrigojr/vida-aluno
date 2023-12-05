const bd = require('../bancoDeDados/bancoDeDados')


const buscarProfessorPor = async(busca)=>{

    return await bd('professores').where(busca).first()
}

const buscarComportamentoAluno = async(id, materia)=>{
    return await bd.column('comportamento', 'media1', 'media2', 'media3', 'media4', 'observacao', 'materia').select().from('caderneta').where({id_aluno: id, materia})
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

const buscarTurmaPorEmail = async(email) =>{

   const turmasString = await bd.column('turmas').select().from('professores').where(email)
   const turmasArray = turmasString[0].turmas.split(', ')

   return turmasArray
}




module.exports = {buscarProfessorPor, buscarComportamentoAluno, buscarAlunos, buscarAlunosPor, buscarComportamentoPor, buscarTurma, buscarTurmaPorEmail}


