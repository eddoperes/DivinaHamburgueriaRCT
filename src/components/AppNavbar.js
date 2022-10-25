import './AppNavBar.css';
import React from 'react'
import {Link} from 'react-router-dom';

import { AiFillHome } from 'react-icons/ai';
import { FaUserAlt, FaBinoculars } from 'react-icons/fa';
import { BsFillCartFill } from 'react-icons/bs';
import { MdFastfood } from 'react-icons/md';

const AppNavbar = () => {
  return (
    <div className="navbar">

      <Link to={'/'}>
        <AiFillHome className="icon"/> 
        Home
      </Link>      
      
      <div className="dropdown">
        <button className="dropbtn">           
          <MdFastfood className="icon"/>
          Pedidos
        </button>
        <div className="dropdown-content">
          <a >Itens do cardápio</a>
          <a >Cardápios</a>         
          <hr />
          <a >Pedidos salão</a>
          <a >Pedidos delivery</a>
        </div>        
      </div> 

      <div className="dropdown">
        <button className="dropbtn">           
          <BsFillCartFill className="icon"/>
          Estoques
        </button>
        <div className="dropdown-content">
          <Link to={'/ItensDoEstoqueReceita'}>Itens do estoque</Link>
          <Link to={'/ItensDoEstoqueReceita'}>Pedidos compra</Link>
          <hr />
          <a>Entrada no estoque</a>
          <hr />
          <a>Estoques</a>
        </div>        
      </div> 

      <div className="dropdown">
        <button className="dropbtn">           
          <FaBinoculars className="icon"/>
          Inspeção
        </button>
        <div className="dropdown-content">
          <Link to={'/ItensDoEstoqueReceita'}>Alarmes</Link>
        </div>        
      </div> 
      
      <a>
        <FaUserAlt className="icon"/>
        Login
      </a>

    </div>    
  )
}

export default AppNavbar