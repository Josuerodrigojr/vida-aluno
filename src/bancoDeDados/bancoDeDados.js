const bd = require('knex')({
    client: 'pg',
    connection: {
      host: "isabelle.db.elephantsql.com",
      user: "hxvvnnzy",
      password: "pJzESIoLPJZP_eAx62PzMUoSx3cUUe3n",
      database: "hxvvnnzy",
      port: "5432",
      ssl: { rejectUnauthorized: false }
    }
  })
  
  
  module.exports = bd
  