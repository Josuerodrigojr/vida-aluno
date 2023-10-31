const bcrypt = require('bcrypt')
const { buscarProfessorPor } = require("../banco/select");
const { cadastrarProfessor } = require('../banco/insert');


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
        return res.status(201).json(professorCadastrado)
}
        


    } catch(erro){
        return res.status(500).json({mensagem: "Erro no servidor"})
    }
}

module.exports = {buscarProfessorPorID, registrarProfessor}