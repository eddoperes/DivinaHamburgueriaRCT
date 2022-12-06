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
          <Link to={'/'}>Itens do cardápio</Link>
          <Link to={'/'}>Cardápios</Link>
          <hr />
          <Link to={'/'}>Pedidos salão</Link>
          <Link to={'/'}>Pedidos delivery</Link>
        </div>        
      </div> 

      <div className="dropdown">
        <button className="dropbtn">           
          <BsFillCartFill className="icon"/>
          Estoques
        </button>
        <div className="dropdown-content">
          <Link to={'/InventoryItems'}>Itens do estoque</Link>
          <Link to={'/PurchaseOrders'}>Pedidos compra</Link>
          <hr />
          <Link to={'/Inventories'}>Estoques</Link>
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
      
      <Link to={'/login'}>
        <FaUserAlt className="icon"/> 
        Login
      </Link> 

    </div>    
  )
}

export default AppNavbar