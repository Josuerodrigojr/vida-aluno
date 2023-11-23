const express = require('express')
const { comportamentoAluno, mostrarAlunos, registrarAlunos, alterarAluno, deletarAluno } = require('../controladores/alunos')
const validarToken = require('../validacao/validarToken')

const rotasAlunos = express()



// rotasAlunos.use(validarToken)

rotasAlunos.get('/', (req,res)=>{
    return res.send(200).send('foi')
})
rotasAlunos.get('/alunos/comportamento', comportamentoAluno)
rotasAlunos.get('/alunos', mostrarAlunos)
rotasAlunos.post('/alunos', registrarAlunos )
rotasAlunos.patch('/alunos/:id', alterarAluno) 
rotasAlunos.delete('/alunos/:id', deletarAluno)

module.exports = rotasAlunos