import './HallOrdersMenuItems.css';

//react hooks
import React from 'react'
import { useState, useEffect } from "react";

//icones
import { BsTrashFill } from 'react-icons/bs';

const HallOrdersMenuItems = ({menuItems, handleGetItem, number, item, configure}) => {

  //state
  const [id, setId] = useState(0);
  const [menuItemsId, setMenuItemsId] = useState(1);
  const [price, setPrice] = useState(0);
  const [observation, setObservation] = useState('');
  const [deleted, setDeleted] = useState(false);

  //ref
  //const componentDivRef = useRef(null);

  //init
  handleGetItem(number, getItem)

  useEffect(() => {             
        if (item !== null && item !== undefined && 
            menuItems !== null && menuItems !== undefined)
        {  
                setId(item.id);
                setMenuItemsId(item.menuItemId);
                setPrice(item.price);
                setObservation(item.observation);   
        }
  }, [item, menuItems]);

  //func
  function getItem(){

        //if (componentDivRef.current.style.display === "none")
        //        return null;
        if (deleted)
                return null;

        var item  = {    
                id: id,
                menuItemId: menuItemsId,
                price: price,
                observation: observation,
        }
        return item;
  }

  function hideComponent(e){
        e.preventDefault();
        //componentDivRef.current.style.display = "none"; 
        setDeleted(true);
  }

  return (

        <div>

                {number === 0 &&
                        <div className='menu-item-container'>
                                <label className="select-edit-menu-item">
                                        Item
                                </label>   
                                <label className="input-edit-menu-item input-edit-number-menu-item">
                                        Preço
                                </label> 
                                <label className="input-edit-menu-item input-edit-number-menu-item">
                                        Observação
                                </label>
                                <div className="space-remove-list-menu-item">                                        
                                </div>
                        </div>
                }

                {!deleted &&
                        <div className='menu-item-container'>

                                <select value={menuItemsId}
                                        className="select-edit-menu-item"  
                                        disabled={configure.disableInputs}
                                        onChange={(e) => {setMenuItemsId(e.target.value)}}              
                                >
                                        {menuItems.map((menuItem) => (
                                        <option key={menuItem.id} value={menuItem.id}>
                                                {menuItem.name}
                                        </option>                   
                                        ))}
                                </select>          

                                <input type="number"
                                        className='input-edit-menu-item input-edit-number-menu-item'
                                        disabled={configure.disableInputs}
                                        value={price}  
                                        onChange={(e) => setPrice(e.target.value)} 
                                        min={1}
                                        step="any"
                                />

                                <input type="text"
                                        className='input-edit-menu-item input-edit-text-menu-item'
                                        disabled={configure.disableInputs}
                                        value={observation}  
                                        onChange={(e) => setObservation(e.target.value)} 
                                />          

                                <button className='button-remove-list-menu-item' 
                                        disabled={configure.disableInputs}
                                        onClick={(e) => hideComponent(e)}
                                >
                                        <BsTrashFill className="icon-size-menu-item"/>
                                </button>

                        </div>
                }

        </div>

  )
  
}

export default HallOrdersMenuItems