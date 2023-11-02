const express = require('express');
const {buscarProfessorPorID, registrarProfessor, alterarProfessor, deletarProfessor} = require('../controladores/professores');
const { login } = require('../controladores/autenticacao');
const validarToken = require('../validacao/validarToken');


const rotasProfessores = express()


rotasProfessores.post('/professores', registrarProfessor)
rotasProfessores.post('/professores/login', login)


// rotasProfessores.use(validarToken)
rotasProfessores.get('/professores',buscarProfessorPorID)
rotasProfessores.patch('/professores/:id', alterarProfessor)
rotasProfessores.delete('/professores/:id', deletarProfessor)


module.exports = rotasProfessores