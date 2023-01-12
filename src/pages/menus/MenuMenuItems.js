import './MenuMenuItems.css';

//react hooks
import React from 'react'
import { useState, useEffect } from "react";

//icones
import { BsTrashFill } from 'react-icons/bs';

const MenuMenuItems = ({menuItems, handleGetItem, number, item, configure}) => {
  
  //state
  const [id, setId] = useState(0);
  const [menuItemId, setMenuItemId] = useState(1);
  const [price, setPrice] = useState(0);
  const [state, setState] = useState(0);
  const [deleted, setDeleted] = useState(false);
  
  //init
  handleGetItem(number, getItem)

  useEffect(() => {             
    if (item !== null && item !== undefined && 
        menuItems !== null && menuItems !== undefined)
        {  
            setId(item.id);
            setMenuItemId(item.menuItemId);
            setPrice(item.price);
            setState(item.state);   
        }
  }, [item, menuItems]);

   //func
   function getItem(){
    if (deleted)
        return null;
    var item  = {    
        id: id,
        menuItemId: menuItemId,
        price: price,
        state: state,
    }
    return item;
  }

  function hideComponent(e){
    e.preventDefault();
    setDeleted(true);
  }

  return (
    <div>
        
        {number === 0 &&
            <div className='menu-menu-item-container'>
                <label className="select-edit-menu-menu-item">
                    Item
                </label>   
                <label className="input-edit-menu-menu-item input-edit-number-menu-menu-item">
                    Preço
                </label> 
                <label className="check-edit-menu-menu-item">
                    Estado
                </label> 
                <div className="space-remove-list-menu-menu-item">                                        
                </div>
            </div>
        }

        {!deleted &&
            <div className='menu-menu-item-container'>

                <select value={menuItemId}
                        className="select-edit-menu-menu-item"  
                        disabled={configure.disableInputs}
                        onChange={(e) => {setMenuItemId(e.target.value)}}              
                >
                        {menuItems.map((menuItem) => (                            
                            <option key={menuItem.id} value={menuItem.id}>
                                {menuItem.name}
                            </option>                   
                        ))}
                </select>          

                <input type="number"
                        className='input-edit-menu-menu-item input-edit-number-menu-menu-item'
                        disabled={configure.disableInputs}
                        value={price}  
                        onChange={(e) => setPrice(e.target.value)} 
                        min={1}
                        step="any"
                />

                <div className="check-edit-menu-menu-item">
                    <label>
                        <input type="checkbox"
                                className='input-edit'
                                name="state"
                                checked={state}  
                                disabled={configure.disableInputs}
                                onChange={(e) => setState(e.target.checked ? 1 : 0)}      
                        />
                    Ativo</label> 
                </div>            

                <button className='button-remove-list-menu-menu-item' 
                        disabled={configure.disableInputs}
                        onClick={(e) => hideComponent(e)}
                >
                        <BsTrashFill className="icon-size-menu-menu-item"/>
                </button>

            </div>
        }
        
    </div>
  )

}

export default MenuMenuItems