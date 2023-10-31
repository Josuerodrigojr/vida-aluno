const express = require('express')
const { comportamentoAluno } = require('../controladores/alunos')

const rotasAlunos = express()

rotasAlunos.get('/alunos/comportamento', comportamentoAluno)

module.exports = rotasAlunos