import { useState } from 'react'; // 1. Importa o useState para gerenciar o estado
import './DisciplinaForm.css'; // 2. Importa o CSS do formulário

const DisciplinaForm = ({ setSync, setShowList }) => { // 3. Recebe as funções de estado do componente pai
  const [nome, setNome] = useState(''); // 4. Estado para o campo 'nome'
  const [cargaHoraria, setCargaHoraria] = useState(''); // 5. Estado para o campo 'cargaHoraria'

  const handleSubmit = async (e) => { // 6. Função assíncrona para lidar com o envio do formulário
    e.preventDefault(); // 7. Previne o comportamento padrão de recarregar a página
    const disciplina = { nome, carga_horaria: Number(cargaHoraria) }; // 8. Cria o objeto de disciplina para enviar à API

    try {
      const response = await fetch('http://localhost:3000/api/disciplinas', { // 9. Faz a requisição POST para a API
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(disciplina),
      });

      if (response.ok) { // 10. Verifica se a requisição foi bem-sucedida
        console.log('Disciplina cadastrada com sucesso.');
        setSync(prevSync => prevSync + 1); // 11. Avisa ao pai para atualizar a lista
        setShowList(true); // 12. Muda o estado do pai para exibir a lista
        setNome(''); // 13. Limpa os campos do formulário
        setCargaHoraria('');
      } else {
        console.error('Erro ao cadastrar a disciplina:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className='disciplina-form-container'>
        <h2>Cadastrar nova disciplina</h2>
        <form onSubmit={handleSubmit}> {/* 14. Quando o formulário é enviado, a função handleSubmit é chamada */}
            <div className='form-control'>
                <label htmlFor="nome">Nome da disciplina: </label>
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label htmlFor="cargaHoraria"> Carga horária (em horas): </label>
                <input
                    type="text"
                    id='cargaHoraria'
                    value={cargaHoraria}
                    onChange={(e) => setCargaHoraria(e.target.value)}
                />
            </div>
            {/* 15. Container para os botões do formulário */}
            <div className="form-buttons-container">
                <button type='submit'>
                  Cadastrar
                </button>
                <button type="button" onClick={() => setShowList(true)}>
                  Ver Disciplinas
                </button>
            </div>
        </form>
    </div>
  );
};

export default DisciplinaForm;