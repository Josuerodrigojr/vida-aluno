const { buscarComportamentoAluno } = require("../banco/select")



const comportamentoAluno = async (req,res)=>{
    try{
        const id = 1

        const comportamento = await buscarComportamentoAluno(id)
        console.log(comportamento)
      
        res.status(200).json(comportamento)
    } catch{
        res.status(500).json("Erro no servidor")
    }
}

module.exports = {comportamentoAluno}