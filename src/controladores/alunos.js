const { cadastrarAluno } = require("../banco/insert")
const { buscarComportamentoAluno , buscarAlunos, buscarAlunosPor} = require("../banco/select")
const bcrypt = require('bcrypt')
const { atualizarAluno } = require("../banco/update")
const { excluirAluno } = require("../banco/delete")
const MSG = require("../helpers/MSG")

const loginAluno = async(req,res)=>{
    try{
        const {cpf} = req.body;

        const aluno = await buscarAlunosPor({cpf})

        if (!aluno){
            return res.status(404).json({mensagem: MSG.alunoNaoEncontrado})
        }

        return res.status(200).json(aluno)



    } catch{
        res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

const comportamentoAluno = async (req,res)=>{
    try{
        const id = 1

        const comportamento = await buscarComportamentoAluno(id)
        console.log(comportamento)
      
        res.status(200).json(comportamento)
    } catch{
        res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

const mostrarAlunos = async(req,res)=>{
    try{
        const alunos = await buscarAlunos()
        return res.status(200).json(alunos)
    } catch (erro){
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

const registrarAlunos = async(req,res)=>{
    const {primeiroNome, segundoNome, turma, email, senha, cpf} = req.body
    try{
        const emailAluno = await buscarAlunosPor({email})

        if (emailAluno){
            return res.status(404).json({mensagem: MSG.emailCadastrado})
        }
        const cpfAluno = await buscarAlunosPor({cpf})

        if (cpfAluno){
            return res.status(404).json({mensagem: MSG.cpfCadastrado})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await cadastrarAluno(primeiroNome, segundoNome, turma, email, senhaCriptografada, cpf)

        return res.status(201).json()


    } catch(erro){
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

const alterarAluno = async (req,res)=>{
    const {id} = req.params
    
    try{
        const aluno = await buscarAlunosPor({id})
    
        if (!aluno){
            return res.status(404).json({mensagem: MSG.alunoNaoEncontrado})
        }
        let {primeiroNome, segundoNome, turma, email, senha, cpf} = req.body
        
        if (email){
        const emailAluno = await buscarAlunosPor({email})
            
        if(emailAluno){
            return res.status(404).json({mensagem: MSG.emailCadastrado})
        }}
    
    if (senha){
            senha = await bcrypt.hash(senha, 10)
    }
        const novoAluno = await atualizarAluno(id, primeiroNome, segundoNome, turma, email, senha, cpf)
        
        if (novoAluno){
            return res.status(200).json(novoAluno)
        }
    
    } catch(erro){
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
    }

const deletarAluno = async(req,res)=>{
    const {id} = req.params
    try{
        const aluno = await buscarAlunosPor({id})
    
        if (!aluno){
            return res.status(404).json({mensagem: MSG.alunoNaoEncontrado})
        }

        await excluirAluno(id)

        return res.status(201).json()
    } catch (erro){
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

module.exports = {comportamentoAluno, mostrarAlunos, registrarAlunos, alterarAluno, deletarAluno}