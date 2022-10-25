import './App.css';
import Home from  './pages/Home'
import ItemDoEstoqueReceita from './components/ItemDoEstoqueReceita';
import ItemDoEstoqueReceitaEdit from './components/ItemDoEstoqueReceitaEdit';
import ItemDoEstoqueReceitaNew from './components/ItemDoEstoqueReceitaNew';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MainContextProvider from './contexts/MainContext'

import  AppNavbar from  './components/AppNavbar'

function App() {

  return (
    <div className="App">          
      <MainContextProvider>
        <BrowserRouter>
          <AppNavbar></AppNavbar> 
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/ItensDoEstoqueReceita" element={<ItemDoEstoqueReceita/>} />
            <Route path="/ItensDoEstoqueReceita/New" element={<ItemDoEstoqueReceitaNew/>} />
            <Route path="/ItensDoEstoqueReceita/Edit/:id" element={<ItemDoEstoqueReceitaEdit/>} />
          </Routes>
        </BrowserRouter>
      </MainContextProvider>
    </div>
  );
}

export default App;
