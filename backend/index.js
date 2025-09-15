const express = require('express'); // 1. Importa o Express
const path = require('path'); // 2. Módulo nativo para trabalhar com caminhos
const cors = require('cors'); // 3. Middleware para permitir requisições de outras origens
const app = express(); // 4. Cria a aplicação Express
const port = 3000; // 5. Define a porta do servidor
const db = require('./db'); // 6. Importa a conexão com o banco de dados

app.use(express.json()); // 7. Habilita o servidor a ler JSON do corpo da requisição
app.use(cors()); // 8. Habilita o CORS para o frontend

// 9. Rota para buscar todas as disciplinas
app.get('/api/disciplinas', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM disciplinas ORDER BY id'); // 10. Consulta o banco e ordena por ID
        res.json(rows); // 11. Retorna os resultados em formato JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar as disciplinas.' });
    }
});

// 12. Rota para adicionar uma nova disciplina
app.post('/api/disciplinas', async (req, res) => {
    const { nome, carga_horaria, porcentagem_maxima_faltas } = req.body;
       
    // Validar se os campos obrigatórios existem
    if (!nome || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome da disciplina é obrigatório' });
    }
    
    if (!carga_horaria) {
        return res.status(400).json({ error: 'Carga horária é obrigatória' });
    }
    
    // Validar se carga horária é um número válido
    const cargaNum = Number(carga_horaria);
    if (isNaN(cargaNum) || cargaNum <= 0 || cargaNum > 90) {
        return res.status(400).json({ error: 'Carga horária deve ser um número maior que 0h e menor que 90h' });
    }
    
    // Validar se nome não é muito longo
    if (nome.trim().length > 50) {
        return res.status(400).json({ error: 'Nome da disciplina muito longo (máximo 50 caracteres)' });
    }
    
    try {
        const result = await db.query(
            'INSERT INTO disciplinas (nome, carga_horaria, porcentagem_maxima_faltas) VALUES ($1, $2, $3) RETURNING *',
            [nome.trim(), cargaNum, porcentagem_maxima_faltas || 0.25] // trim() remove espaços extras
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro detalhado:', err); // Log mais detalhado
        res.status(500).json({ error: 'Erro ao inserir a disciplina.' });
    }
});

// 16. Rota para atualizar o número de faltas
app.put('/api/disciplinas/:id', async (req, res) => {
    const { id } = req.params; // 17. Pega o ID da URL
    const { faltas } = req.body; // 18. Pega o novo valor de faltas
    try {
        const result = await db.query(
            'UPDATE disciplinas SET faltas = $1 WHERE id = $2 RETURNING *', // 19. Atualiza as faltas da disciplina
            [faltas, id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Disciplina não encontrada.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar as faltas.' });
    }
});

// 20. Rota principal
app.get('/', (req, res) => {
    res.send('Servidor backend funcionando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});