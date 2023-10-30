const express = require('express')
const cors = require('cors')
const teste = require('./banco/select')

const app = express()
app.use(express.json())

app.use(cors())

app.get('/', async (req,res)=>{
    const ew = await teste()
    console.log(ew)
    res.json(ew)
})

app.listen(3000, ()=>{
    console.log("Foi")
})