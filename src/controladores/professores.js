const bcrypt = require('bcrypt')
const { buscarProfessorPor, buscarTurmaPorEmail } = require("../banco/select");
const { cadastrarProfessor } = require('../banco/insert');
const { atualizarProfessor } = require('../banco/update');
const {excluirProfessor} = require('../banco/delete');
const MSG = require('../helpers/MSG');


const buscarProfessorPorID = async (req,res)=>{
    const {id} = req.usuario

    
    try{


        const {primeironome, segundonome, materia, email, turmas} = await buscarProfessorPor({id})
const professor = {
    primeiroNome: primeironome, segundoNome: segundonome, materia, email, turmas
}
        res.status(200).json(professor)

    } catch{
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

const registrarProfessor = async (req,res)=>{
    const {primeiroNome, segundoNome, turmas, materia, email, senha} = req.body

    try{
        if(!primeiroNome || !segundoNome || !turmas || !materia || !email || !senha){
            return res.status(404).json({mensagem: MSG.camposObrigatorio})
        }
        
        const emailProfessor = await buscarProfessorPor({email})
        
        if(emailProfessor){
            return res.status(404).json({mensagem: MSG.emailCadastrado})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)


        const professorCadastrado = await cadastrarProfessor(primeiroNome, segundoNome, turmas, materia, email, senhaCriptografada)


        if (professorCadastrado){
        return res.status(201).json()
}
        


    } catch(erro){
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

const alterarProfessor = async (req,res)=>{
const {id} = req.params

try{
    const professor = await buscarProfessorPor({id})

    if (!professor){
        return res.status(404).json({mensagem: MSG.professorNaoEncontrado})
    }
    let {primeiroNome, segundoNome, turmas, materia, email, senha} = req.body
    
    if (email){
    const emailProfessor = await buscarProfessorPor({email})
        
    if(emailProfessor){
        return res.status(404).json({mensagem: MSG.emailCadastrado})
    }}

if (senha){
        senha = await bcrypt.hash(senha, 10)
}
    const novoProfessor = await atualizarProfessor(id, primeiroNome, segundoNome, turmas, materia, email, senha)
    
    if (novoProfessor){
        return res.status(200).json(novoProfessor)
    }

} catch(erro){
    return res.status(500).json({mensagem: MSG.erroNoServidor})
}
}

const deletarProfessor = async (req,res)=>{
    const {id} = req.params
    try{
        const professor = await buscarProfessorPor({id})

        if (!professor){
            return res.status(404).json({mensagem: MSG.professorNaoEncontrado})
        }

        await excluirProfessor(id)

        return res.status(201).json()

    } catch(erro){
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

const buscarTurmasPorEmail = async (req,res)=>{
    const {email} = req.body
    try{

        const turmas = await buscarTurmaPorEmail({email})
        if (turmas.length <1 ){
            return res.status(200).json({mensagem:'Não tem turmas cadastradas'})
        }
        return res.status(200).json(turmas)

    } catch (erro){
        
        return res.status(500).json({mensagem: MSG.erroNoServidor})
    }
}

module.exports = {buscarProfessorPorID, registrarProfessor, alterarProfessor, deletarProfessor, buscarTurmasPorEmail}