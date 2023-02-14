//react hooks
import React from 'react'
import { useState, useEffect } from "react";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const Inventory = ({handlePersistence, item, configure}) => {

  //state
  const [inventoryItemId, setInventoryItemId] = useState(0);
  const [quantity, setQuantity] = useState(0);

  //data 
  const { data: inventoryItems, 
          error: errorInventoryItems, 
          waiting: showWaitingInventoryItems,
          inventoryItemsGetAll } = useFetchInventoryItems();  

  //init
  useEffect(() => {             

    inventoryItemsGetAll();

    setInventoryItemId(item.inventoryItemId);
    setQuantity(item.quantity);  

  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  //func
  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = {
      inventoryItemId : inventoryItemId,
      quantity : quantity
    } 
    handlePersistence(data)
  }

  return (
    <div>

      {showWaitingInventoryItems && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorInventoryItems && !showWaitingInventoryItems &&
        <p className='error-message-edit'>{errorInventoryItems}</p>
      } 
         
      {inventoryItems && !showWaitingInventoryItems &&

        <form onSubmit={handleSubmit} className="form-edit">

          <label>Item do estoque          
            <select value={inventoryItemId}
                    className="select-edit"
                    disabled
                    onChange={(e) => setInventoryItemId(e.target.value)}                
            >
                {inventoryItems.map((inventoryItem) => (
                    <option key={inventoryItem.id} value={inventoryItem.id}>
                        {inventoryItem.name}
                    </option>                   
                ))}
            </select>          
          </label>

          <label>Quantidade
            <input type="number"
                  className='input-edit input-edit-number'
                  value={quantity}  
                  disabled={configure.disableInputs}
                  onChange={(e) => setQuantity(e.target.value)} 
                  min={1}
            />
          </label>

          <div>
              <input type="submit" 
                    value="Enviar"
                    className="input-edit-submit"
              />
              <div className="clear-both">
              </div>
            </div>

        </form>
      }

    </div>
  )
}

export default Inventory