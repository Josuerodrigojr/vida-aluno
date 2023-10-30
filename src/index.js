const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

app.get('/', (req,res)=>{
    res.send('O teste foi feito com sucesso')
})

app.listen(3000, ()=>{
    console.log("Foi")
})