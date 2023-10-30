const bd = require('../bancoDeDados/bancoDeDados')


const teste  = async ()=>{

    return await bd('usuarios')
}


module.exports = teste


