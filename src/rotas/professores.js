const express = require('express');
const buscarProfessorPorID = require('../controladores/professores');


const rotasProfessores = express()

rotasProfessores.get('/professores', buscarProfessorPorID)



module.exports = rotasProfessores