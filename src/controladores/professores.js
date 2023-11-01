const bcrypt = require('bcrypt')
const { buscarProfessorPor } = require("../banco/select");
const { cadastrarProfessor } = require('../banco/insert');
const { atualizarProfessor } = require('../banco/update');
const {excluirProfessor} = require('../banco/delete')


const buscarProfessorPorID = async (req,res)=>{
    const {id} = req.usuario

    
    try{


        const {primeironome, segundonome, materia, email, turmas} = await buscarProfessorPor({id})
const professor = {
    primeiroNome: primeironome, segundoNome: segundonome, materia, email, turmas
}
        res.status(200).json(professor)

    } catch{
        return res.status(500).json({mensagem: "Erro no servidor"})
    }
}

const registrarProfessor = async (req,res)=>{
    const {primeiroNome, segundoNome, turmas, materia, email, senha} = req.body

    try{
        if(!primeiroNome || !segundoNome || !turmas || !materia || !email || !senha){
            return res.status(404).json({mensagem: "Campos obrigatórios estão em branco"})
        }
        
        const emailProfessor = await buscarProfessorPor({email})
        
        if(emailProfessor){
            return res.status(404).json({mensagem: "Email já está registrado"})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)


        const professorCadastrado = await cadastrarProfessor(primeiroNome, segundoNome, turmas, materia, email, senhaCriptografada)


        if (professorCadastrado){
        return res.status(201).json()
}
        


    } catch(erro){
        return res.status(500).json({mensagem: "Erro no servidor"})
    }
}

const alterarProfessor = async (req,res)=>{
const {id} = req.params

try{
    const professor = await buscarProfessorPor({id})

    if (!professor){
        return res.status(404).json({mensagem: "Professor não encontrado!"})
    }
    let {primeiroNome, segundoNome, turmas, materia, email, senha} = req.body
    
    if (email){
    const emailProfessor = await buscarProfessorPor({email})
        
    if(emailProfessor){
        return res.status(404).json({mensagem: "Email já está registrado"})
    }}

if (senha){
        senha = await bcrypt.hash(senha, 10)
}
    const novoProfessor = await atualizarProfessor(id, primeiroNome, segundoNome, turmas, materia, email, senha)
    
    if (novoProfessor){
        return res.status(200).json(novoProfessor)
    }

} catch(erro){
    return res.status(500).json({mensagem: "Erro interno no servidor."})
}
}

const deletarProfessor = async (req,res)=>{
    const {id} = req.params
    try{
        const professor = await buscarProfessorPor({id})

        if (!professor){
            return res.status(404).json({mensagem: "Professor não encontrado!"})
        }

        await excluirProfessor(id)

        return res.status(201).json()

    } catch(erro){
        return res.status(500).json({mensagem: 'Erro ao servidor!'})
    }
}

module.exports = {buscarProfessorPorID, registrarProfessor, alterarProfessor, deletarProfessor}