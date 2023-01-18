//react hooks
import { useState, useEffect } from "react";

const Address = ({handleGetItem, item, configure}) => {

  //state
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState(0);
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [federationUnity, setFederationUnity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  //data

  //init
  handleGetItem(getItem)    

  useEffect(() => {          
    if (item !== null && item !== undefined)
    {                 
        setStreet(item.street);
        setNumber(item.number);
        setComplement(item.complement);
        setDistrict(item.district);
        setCity(item.city);
        setFederationUnity(item.federationUnity);
        setPostalCode(item.postalCode);        
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
      street : street,
      number : number,
      complement : complement,
      district : district,
      city : city,
      federationUnity : federationUnity,
      postalCode : postalCode
    }
    return item;
  }

  return (

    <div>

      <label>Rua
        <input type="text"
               className='input-edit input-edit-text'
               name="street"
               value={street}  
               disabled={configure.disableInputs}
               onChange={(e) => {
                          setStreet(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={50}         
               required  
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>

      <label>Número
        <input type="number"
              className='input-edit input-edit-number'
              name="number"
              value={number}
              disabled={configure.disableInputs} 
              onChange={(e) => {
                              setNumber(e.target.value);
                              handleResetTextValidation(e);
                        }
              } 
              min={1}
              step="any"
        />
      </label>

      <label>Complemento
        <input type="text"
               className='input-edit input-edit-text'
               name="complement"
               value={complement}  
               disabled={configure.disableInputs}
               onChange={(e) => {
                          setComplement(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={50}         
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>
    
      <label>Bairro
        <input type="text"
               className='input-edit input-edit-text'
               name="district"
               value={district}  
               disabled={configure.disableInputs}
               onChange={(e) => {
                          setDistrict(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={50}         
               required  
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>

      <label>Cidade
        <input type="text"
               className='input-edit input-edit-text'
               name="city"
               value={city}  
               disabled={configure.disableInputs}
               onChange={(e) => {
                          setCity(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={50}         
               required  
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>

      <label>UF
        <input type="text"
               className='input-edit input-edit-text'
               name="federationUnity"
               value={federationUnity}  
               disabled={configure.disableInputs}
               onChange={(e) => {
                          setFederationUnity(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={2}         
               required  
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>

      <label>CEP
        <input type="text"
               className='input-edit input-edit-text'
               name="postalCode"
               value={postalCode} 
               disabled={configure.disableInputs} 
               onChange={(e) => {
                          setPostalCode(e.target.value); 
                          handleResetTextValidation(e);
                        }
               }
               maxLength={8}         
               required  
               onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
        />
      </label>

    </div>

  )
}

export default Address