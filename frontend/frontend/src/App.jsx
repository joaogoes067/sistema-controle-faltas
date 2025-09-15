import { useState } from 'react';
import DisciplinaForm from './components/DisciplinaForm';
import DisciplinaList from './components/DisciplinaList';
import './App.css';

function App() {
  const [sync, setSync] = useState(0); // Estado para sincronizar a lista
  const [showList, setShowList] = useState(false); // Estado para controlar a visualização da lista

  return (
    <div className="App">
      {!showList ? (
        // Renderiza o formulário se 'showList' for falso
        <DisciplinaForm setSync={setSync} setShowList={setShowList} />
      ) : (
        // Renderiza a lista se 'showList' for verdadeiro
        <DisciplinaList sync={sync} setSync={setSync} setShowList={setShowList} />
      )}
    </div>
  );
}

export default App;