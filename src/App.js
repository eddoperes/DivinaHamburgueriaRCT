import './App.css';
import ItemDoEstoqueReceita from './components/ItemDoEstoqueReceita';
import ItemDoEstoqueReceitaEdit from './components/ItemDoEstoqueReceitaEdit';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MainContextProvider from './contexts/MainContext'

import  Navbar from  './components/Navbar'

function App() {

  return (
    <div className="App">   
      <Navbar/>
      <MainContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/ItensDoEstoqueReceita" element={<ItemDoEstoqueReceita/>} />
            <Route path="/ItensDoEstoqueReceita/Edit/:id" element={<ItemDoEstoqueReceitaEdit/>} />
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;
