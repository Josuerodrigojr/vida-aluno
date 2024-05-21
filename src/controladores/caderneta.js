const { buscarAlunosPor, buscarComportamentoPor, buscarTurma } = require("../banco/select")
const MSG = require('../helpers/MSG')

const mostrarComportamentoPorCpf = async (req,res)=>{
    const {cpf} = req.query

    try{
        const aluno = await buscarAlunosPor({cpf})
        if(!aluno){
            return res.status(404).json({mensagem: MSG.alunoNaoEncontrado})
        }
        const {id: id_aluno} = aluno
        const comportamento = await buscarComportamentoPor({id_aluno})
        return res.status(200).json(comportamento)

    } catch (erro){
        return res.status(500).json({mensagem:MSG.erroNoServidor})
    }
}

const mostrarTurma = async (req,res)=>{
    const {turma} = req.query
    console.log(turma)

    try{
        const turmaCompleta = await buscarTurma({turma})
        console.log(turmaCompleta)

        if (turmaCompleta.length < 1){
           return res.status(404).json({mensagem:MSG.turmaNaoEncontrada})
        }

        return res.status(200).json(turmaCompleta)

    } catch(erro){
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

module.exports = {mostrarComportamentoPorCpf, mostrarTurma}