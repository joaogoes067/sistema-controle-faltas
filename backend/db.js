require('dotenv').config(); // Adicionar esta linha no topo
const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};

/*
const { Pool } = require('pg'); // 1. Importa a classe Pool da biblioteca 'pg'

const pool = new Pool({ // 2. Cria uma instância da conexão (pool de conexões)
    user: 'postgres', // 3. Usuário do banco de dados
    host: 'localhost', // 4. Onde o banco de dados está rodando
    database: 'faculdade_db', // 5. Nome do banco de dados que será usado
    password: 'JOAOdaufrn2025.1', // 6. Senha do usuário 'postgres'
    port: 5432, // 7. Porta padrão do PostgreSQL
});

module.exports = {
    // 8. Exporta uma função que executa consultas SQL de forma segura
    query: (text, params) => pool.query(text, params),
};
*/