//realiza a conexão com o banco de dados através do drive pg
const Pool = require("pg").Pool;
const dotenv = require('dotenv');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

module.exports = pool;