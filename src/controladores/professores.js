const { buscarProfessorPor } = require("../banco/select");


const buscarProfessorPorID = async (req,res)=>{
    try{
        const id = 1;

        const professor = await buscarProfessorPor({id})

        res.status(200).json(professor)

    } catch{
        return res.status(500).json({mensagem: "Erro no servidor"})
    }
}

module.exports = buscarProfessorPorID