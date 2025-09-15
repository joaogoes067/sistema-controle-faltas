import { useState, useEffect } from 'react'; // 1. Hooks para gerenciar estado e efeitos colaterais
import './DisciplinaList.css'; // 2. Importa o CSS da lista

const DisciplinaList = ({ sync, setSync, setShowList }) => { // 3. Recebe props do componente pai
  const [disciplinas, setDisciplinas] = useState([]); // 4. Estado para armazenar a lista de disciplinas

  useEffect(() => { // 5. Hook para buscar dados do backend
    const fetchDisciplinas = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/disciplinas');
        if (response.ok) {
          const data = await response.json();
          setDisciplinas(data); // 6. Atualiza o estado da lista com os dados da API
        } else {
          console.error('Erro ao buscar as disciplinas.');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      }
    };
    fetchDisciplinas();
  }, [sync]); // 7. O efeito é executado na montagem e sempre que 'sync' muda

  const handleUpdateFaltas = async (id, novasFaltas) => { // 8. Função para atualizar as faltas
    if (novasFaltas < 0) {
      return; // 9. Evita que o número de faltas seja negativo
    }

    try {
      const response = await fetch(`http://localhost:3000/api/disciplinas/${id}`, { // 10. Requisição PUT para o backend
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ faltas: novasFaltas }),
      });

      if (response.ok) {
        console.log('Falta registrada com sucesso!');
        setSync(prevSync => prevSync + 1); // 11. Atualiza o estado do pai para re-renderizar a lista
      } else {
        console.error('Erro ao atualizar as faltas:', response.status);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <div className="disciplina-list-container">
      <h2>Disciplinas Cadastradas</h2>
      <ul> {/*12. Renderiza a lista de disciplinas usando .map()*/}
        {disciplinas.map((disciplina) => (
          <li key={disciplina.id}>
            <p>{disciplina.nome} - {disciplina.carga_horaria} horas - Faltas: {disciplina.faltas}</p>
            {/*13. Lógica para calcular faltas restantes*/}
            <p>Faltas restantes: {Math.floor(disciplina.carga_horaria * 1.2 * disciplina.porcentagem_maxima_faltas) - disciplina.faltas}</p> 
            <div className="button-container">
              {/*14. Botão para registrar falta*/}
              <button onClick={() => handleUpdateFaltas(disciplina.id, disciplina.faltas + 1)}> 
                +
              </button>
              {/*15. Botão para remover falta*/}
              <button onClick={() => handleUpdateFaltas(disciplina.id, disciplina.faltas - 1)}> 
                -
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="action-control">
        {/*16. Botão para voltar ao formulário*/}
        <button type="button" onClick={() => setShowList(false)}> 
          Voltar
        </button>
      </div>
    </div>
  );
};

export default DisciplinaList;