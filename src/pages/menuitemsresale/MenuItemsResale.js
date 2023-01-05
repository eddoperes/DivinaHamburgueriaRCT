//react hooks
import React from "react";
import { useState, useEffect } from "react";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsResale = ({handlePersistence, item, configure}) => {

  //state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [inventoryItemId, setInventoryItemId] = useState(1);

  const [showWaiting, setShowWaiting] = useState(false);

  //data
  const { data: inventoryItems, 
          error: errorInventoryItems, 
          inventoryItemsGetAll } = useFetchInventoryItems();  
  if (inventoryItems === null) {inventoryItemsGetAll()};  

  //init
  useEffect(() => {             
    if (item !== null && item !== undefined &&
        inventoryItems !== null && inventoryItems !== undefined )
    {        

        if (name === ''){

          setName(item.name);
          setDescription(item.description);
          setPhoto(item.photo);
          setInventoryItemId(item.inventoryItemId); 
          
        }

    }    
  }, [item, inventoryItems]);// eslint-disable-line react-hooks/exhaustive-deps

  setTimeout(() => {
    setShowWaiting(true);
  }, 1000);

  //func 
  const handleResetTextValidation = async (e) => {
    if (e.target.value !== '')
    {
        e.target.setCustomValidity("");
        e.target.reportValidity();        
    }
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = {
        name : name,
        description : description,
        photo : photo,
        inventoryItemId: inventoryItemId
    } 
    handlePersistence(data)
  }

  return (
    <div>

        {(!inventoryItems && !errorInventoryItems && showWaiting) && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        }  
        {errorInventoryItems && 
            <p className='error-message-edit'>{errorInventoryItems}</p>
        } 
      
        {inventoryItems &&
            <form onSubmit={handleSubmit} className="form-edit">
            
                <label>Nome
                    <input type="text"
                            className='input-edit input-edit-text'
                            name="name"
                            value={name}  
                            disabled={configure.disableInputs}
                            onChange={(e) => {
                                        setName(e.target.value); 
                                        handleResetTextValidation(e);
                                        }
                                    }
                            maxLength={20}         
                            required  
                            onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
                    />
                </label>                            

                <label>Descrição
                    <textarea
                        className='input-edit input-edit-text'
                        value={description}  
                        disabled={configure.disableInputs}
                        onChange={(e) => {
                                        setDescription(e.target.value); 
                                        handleResetTextValidation(e);
                                        }
                                    } 
                        required  
                        onInvalid={(e) => e.target.setCustomValidity("A descrição precisa ser preenchida!")}
                    />
                </label>

                <label>Foto
                    <input type="text"
                        className='input-edit input-edit-text'
                        value={photo}  
                        disabled={configure.disableInputs}
                        onChange={(e) => {
                                        setPhoto(e.target.value); 
                                        handleResetTextValidation(e);
                                        }
                                    } 
                        required  
                        onInvalid={(e) => e.target.setCustomValidity("A foto precisa ser preenchida!")}
                    />
                </label>        

                <label>Item
                    <select value={inventoryItemId}
                            className="select-edit"  
                            disabled={configure.disableInputs}
                            onChange={(e) => {setInventoryItemId(e.target.value)}}              
                    >
                            {inventoryItems.map((inventoryItem) => (
                                <option key={inventoryItem.id} value={inventoryItem.id}>
                                    {inventoryItem.name}
                                </option>                   
                            ))}
                    </select>
                </label>

                {!configure.disableInputs && 
                <div>
                    <input type="submit" 
                        value="Enviar"
                        className="input-edit-submit"
                    />
                    <div className="clear-both">
                    </div>
                </div>
                }

                {configure.disableInputs && 
                <div>
                    <div className="warning-edit">
                        Atenção! Esta ação não pode ser desfeita
                    </div>
                    <div className="clear-both">
                    </div>
                    <div>
                        <input type="submit" 
                                value="Remover" 
                                className="input-edit-submit-remove"
                        />
                    </div>
                    <div className="clear-both">
                    </div>
                </div>
                }

            </form>
        }

    </div>

  )

}

export default MenuItemsResale