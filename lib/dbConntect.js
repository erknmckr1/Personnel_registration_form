const Pool = require("pg").Pool

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database:'person_info',
    user: 'postgres',
    password:'Erkan3402.',
  });

  module.exports = pool;