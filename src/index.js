const express = require('express')
require('dotenv').config()
const cors = require('cors')
const rotasProfessores = require('./rotas/professores')
const rotasAlunos = require('./rotas/alunos')
const rotasCaderneta = require('./rotas/caderneta')

const app = express()
app.use(express.json())

app.use(cors())

app.use(rotasProfessores)
app.use(rotasAlunos)
app.use(rotasCaderneta)

app.listen(3000, ()=>{
    console.log("Foi")
})