import './Ingredients.css';

//react hooks
import React from 'react'
import { useState, useEffect } from "react";

//icones
import { BsTrashFill } from 'react-icons/bs';

const Ingredients = ({eatables, units, handleGetItem, number, item, configure}) => {

  //state
  const [id, setId] = useState(0);
  const [eatableId, setEatableId] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [unitId, setUnitId] = useState(1);
  const [deleted, setDeleted] = useState(false);

  //init
  handleGetItem(number, getItem)

  useEffect(() => {             
    if (item !== null && item !== undefined && 
        eatables !== null && eatables !== undefined &&
        units !== null && units !== undefined)
        {  
            setId(item.id);
            setEatableId(item.eatableId);
            setQuantity(item.quantity);
            setUnitId(item.unityId);   
        }
  }, [item, eatables, units]);

  //func
  function getItem(){
    if (deleted)
        return null;
    var item  = {    
        id: id,
        eatableId: eatableId,
        quantity: quantity,
        unityId: unitId,
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
            <div className='ingredient-container'>
                <label className="select-edit-ingredient">
                    Item
                </label>   
                <label className="input-edit-ingredient input-edit-number-ingredient">
                    Quantidade
                </label> 
                <label className="select-edit-ingredient">
                    Unidade
                </label> 
                <div className="space-remove-list-ingredient">                                        
                </div>
            </div>
        }

        {!deleted &&
            <div className='inventory-item-container'>

                <select value={eatableId}
                        className="select-edit-ingredient"  
                        disabled={configure.disableInputs}
                        onChange={(e) => {setEatableId(e.target.value)}}              
                >
                        {eatables.map((eatable) => (                            
                            <option key={eatable.id} value={eatable.id}>
                                {eatable.name}
                            </option>                   
                        ))}
                </select>          

                <input type="number"
                        className='input-edit-ingredient input-edit-number-ingredient'
                        disabled={configure.disableInputs}
                        value={quantity}  
                        onChange={(e) => setQuantity(e.target.value)} 
                        min={1}
                        step="any"
                />

                <select value={unitId}
                        className="select-edit-ingredient"  
                        disabled={configure.disableInputs}
                        onChange={(e) => {setUnitId(e.target.value)}}              
                >
                        {units.map((unit) => (
                            <option key={unit.id} value={unit.id}>
                                {unit.name}
                            </option>                   
                        ))}
                </select>

                <button className='button-remove-list-inventory-item' 
                        disabled={configure.disableInputs}
                        onClick={(e) => hideComponent(e)}
                >
                        <BsTrashFill className="icon-size-inventory-item"/>
                </button>

            </div>
        }

    </div>

  )

}

export default Ingredients