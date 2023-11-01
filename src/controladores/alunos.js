const { cadastrarAluno } = require("../banco/insert")
const { buscarComportamentoAluno , buscarAlunos, buscarAlunosPor} = require("../banco/select")
const bcrypt = require('bcrypt')
const { atualizarAluno } = require("../banco/update")
const { excluirAluno } = require("../banco/delete")


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

const mostrarAlunos = async(req,res)=>{
    try{
        const alunos = await buscarAlunos()
        return res.status(200).json(alunos)
    } catch (erro){
        return res.status(500).json({mensagem: "Erro interno no servidor"})
    }
}

const registrarAlunos = async(req,res)=>{
    const {primeiroNome, segundoNome, turma, email, senha, cpf} = req.body
    try{
        const emailAluno = await buscarAlunosPor({email})

        if (emailAluno){
            return res.status(404).json({mensagem: "O email já está cadastrado"})
        }
        const cpfAluno = await buscarAlunosPor({cpf})

        if (cpfAluno){
            return res.status(404).json({mensagem: "O cpf já está cadastrado"})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        await cadastrarAluno(primeiroNome, segundoNome, turma, email, senhaCriptografada, cpf)

        return res.status(201).json()


    } catch(erro){
        return res.status(500).json({mensagem: "Erro no servidor"})
    }
}

const alterarAluno = async (req,res)=>{
    const {id} = req.params
    
    try{
        const aluno = await buscarAlunosPor({id})
    
        if (!aluno){
            return res.status(404).json({mensagem: "Aluno não encontrado!"})
        }
        let {primeiroNome, segundoNome, turma, email, senha, cpf} = req.body
        
        if (email){
        const emailAluno = await buscarAlunosPor({email})
            
        if(emailAluno){
            return res.status(404).json({mensagem: "Email já está registrado"})
        }}
    
    if (senha){
            senha = await bcrypt.hash(senha, 10)
    }
        const novoAluno = await atualizarAluno(id, primeiroNome, segundoNome, turma, email, senha, cpf)
        
        if (novoAluno){
            return res.status(200).json(novoAluno)
        }
    
    } catch(erro){
        return res.status(500).json({mensagem: "Erro interno no servidor."})
    }
    }

const deletarAluno = async(req,res)=>{
    const {id} = req.params
    try{
        const aluno = await buscarAlunosPor({id})
    
        if (!aluno){
            return res.status(404).json({mensagem: "Aluno não encontrado!"})
        }

        await excluirAluno(id)

        return res.status(201).json()
    } catch (erro){
        return res.status(500).json({mensagem: "Erro interno ao servidor."})
    }
}

module.exports = {comportamentoAluno, mostrarAlunos, registrarAlunos, alterarAluno, deletarAluno}