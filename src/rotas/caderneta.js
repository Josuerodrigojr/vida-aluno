const express = require('express')
const { mostrarComportamentoPorCpf, mostrarTurma } = require('../controladores/caderneta')
const validarToken = require('../validacao/validarToken')

const rotasCaderneta = express()

rotasCaderneta.use(validarToken)

rotasCaderneta.get("/alunos/caderneta", mostrarComportamentoPorCpf)
rotasCaderneta.get("/caderneta/turma", mostrarTurma) 

 
module.exports = rotasCaderneta