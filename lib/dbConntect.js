const Pool = require("pg").Pool

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database:'db_for_next_form',
    user: 'postgres',
    password:'Erkan3402.',
  });

  module.exports = pool;