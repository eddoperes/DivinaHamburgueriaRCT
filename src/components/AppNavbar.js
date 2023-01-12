import './AppNavBar.css';

//react hooks
import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

//icons
import { AiFillHome } from 'react-icons/ai';
import { FaUserAlt, FaBinoculars } from 'react-icons/fa';
import { BsFillCartFill } from 'react-icons/bs';
import { MdFastfood } from 'react-icons/md';

//data hooks
import { useFetchLocalStorage } from "../hooks/useFetchLocalStorage";

const AppNavbar = () => {

  //state
  const [hasToken, setHasToken] = useState(false);

  //data
  const { get: localStorageGet, set: localStorageSet } = useFetchLocalStorage();

  //init
  const navigate = useNavigate();

  useEffect(() => {   
    var token = localStorageGet("token");
    if (token !== "")
      setHasToken(true);
    else
      setHasToken(false);
  }, [localStorageGet]); 

  //func
  const handleLogout = async(e) => {  
    localStorageSet("token","");
    navigate("/"); 
  }

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
          <Link to={'/MenuItemsRecipe'}>Itens do cardápio receita</Link>
          <Link to={'/MenuItemsResale'}>Itens do cardápio revenda</Link>
          <Link to={'/Menus'}>Cardápios</Link>
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
      
      {!hasToken &&
        <Link to={'/login'}>
          <FaUserAlt className="icon"/> 
          Login
        </Link> 
      }

      {hasToken &&
        <div id="#1">
          <a href="#1" onClick={(e) => handleLogout(e)}>
            <FaUserAlt className="icon"/> 
            Sair
          </a>
        </div>
      }

    </div>    
  )
}

export default AppNavbar