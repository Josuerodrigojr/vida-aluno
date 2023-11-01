const express = require('express')
const { comportamentoAluno, mostrarAlunos, registrarAlunos, alterarAluno, deletarAluno } = require('../controladores/alunos')

const rotasAlunos = express()

rotasAlunos.get('/alunos/comportamento', comportamentoAluno)
rotasAlunos.get('/alunos', mostrarAlunos)
rotasAlunos.post('/alunos', registrarAlunos )
rotasAlunos.patch('/alunos/:id', alterarAluno)
rotasAlunos.delete('/alunos/:id', deletarAluno)

module.exports = rotasAlunos