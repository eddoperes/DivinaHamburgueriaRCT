import './PurchaseOrdersInventoryItems.css';

//react hooks
import React from 'react'
import { useState, useEffect } from "react";

const PurchaseOrdersInventoryItems = ({inventoryItems, handleGetItem, number, item, configure}) => {

  //state
  const [inventoryItemsId, setInventoryItemsId] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //init
  handleGetItem(number, getItem)

  //init
  useEffect(() => {             
        if (item !== null && item !== undefined && 
            inventoryItems !== null && inventoryItems !== undefined)
        {  
                setInventoryItemsId(item.inventoryItemId);
                setUnitPrice(item.unitPrice);
                setQuantity(item.quantity);
                setTotalPrice(item.totalPrice);    
        }
  }, [item, inventoryItems]);

  //func
  function getItem(){
        var item  = {    
                inventoryItemId: inventoryItemsId,
                unitPrice: unitPrice,
                quantity: quantity,
                totalPrice: totalPrice,
                stocked: false
        }
        return item;
  }

  return (

        <div>

                {number === 0 &&
                        <div className='inventory-item-container'>
                                <label className="select-edit-inventory-item">
                                        Item
                                </label>   
                                <label className="input-edit-inventory-item input-edit-number-inventory-item">
                                        Preço unt.
                                </label> 
                                <label className="input-edit-inventory-item input-edit-number-inventory-item">
                                        Quantidade
                                </label>
                                <label className="input-edit-inventory-item input-edit-number-inventory-item">
                                        Preço tot.
                                </label>
                        </div>
                }

                <div className='inventory-item-container'>

                        <select value={inventoryItemsId}
                                className="select-edit-inventory-item"  
                                disabled={configure.disableInputs}
                                onChange={(e) => {setInventoryItemsId(e.target.value)}}              
                        >
                                {inventoryItems.map((inventoryItem) => (
                                <option key={inventoryItem.id} value={inventoryItem.id}>
                                        {inventoryItem.name}
                                </option>                   
                                ))}
                        </select>          

                        <input type="number"
                                className='input-edit-inventory-item input-edit-number-inventory-item'
                                disabled={configure.disableInputs}
                                value={unitPrice}  
                                onChange={(e) => setUnitPrice(e.target.value)} 
                                min={1}
                                step="any"
                        />

                        <input type="number"
                                className='input-edit-inventory-item input-edit-number-inventory-item'
                                disabled={configure.disableInputs}
                                value={quantity}  
                                onChange={(e) => setQuantity(e.target.value)} 
                                min={1}
                                step="any"
                        />

                        <input type="number"
                                className='input-edit-inventory-item input-edit-number-inventory-item'
                                disabled={configure.disableInputs}
                                value={totalPrice}  
                                onChange={(e) => setTotalPrice(e.target.value)} 
                                min={1}    
                                step="any"
                        />

                </div>

        </div>

  )
  
}

export default PurchaseOrdersInventoryItems