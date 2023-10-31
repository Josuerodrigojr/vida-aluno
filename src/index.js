const express = require('express')
const cors = require('cors')
const rotasProfessores = require('./rotas/professores')
const rotasAlunos = require('./rotas/alunos')

const app = express()
app.use(express.json())

app.use(cors())

app.use(rotasProfessores)
app.use(rotasAlunos)

app.listen(3000, ()=>{
    console.log("Foi")
})