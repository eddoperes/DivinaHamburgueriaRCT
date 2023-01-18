//react hooks
import { useState, useEffect } from "react";

const Phone = ({handleGetItem, item, configure}) => {

  //state
  const [ddd, setDDD] = useState('');
  const [number, setNumber] = useState('');

  //data

  //init
  handleGetItem(getItem) 

  //setTimeout(() => {
  //    setShowWaiting(true);
  //}, 1000);
  
  useEffect(() => {          
    if (item !== null && item !== undefined)
    {                
        setDDD(item.ddd);
        setNumber(item.number);                
    }   
  }, [item]); // eslint-disable-line react-hooks/exhaustive-deps

   //func
   const handleResetTextValidation = async (e) => {
    if (e.target.value !== '')
    {
        e.target.setCustomValidity("");
        e.target.reportValidity();        
    }
  } 

  function getItem(){
    var item  = {    
      ddd : ddd,
      number : number
    }
    return item;
  }

  return (
    <div>
     
     <label>DDD
        <input type="text"
               className='input-edit input-edit-text'
               name="ddd"
               value={ddd}  
               disabled={configure.disableInputs}
               onChange={(e) => {
                          setDDD(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={2}         
               required  
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>

      <label>Número
        <input type="text"
               className='input-edit input-edit-text'
               name="number"
               value={number}  
               disabled={configure.disableInputs}
               onChange={(e) => {
                          setNumber(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={9}         
               required  
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>

    </div>
  )

}

export default Phone