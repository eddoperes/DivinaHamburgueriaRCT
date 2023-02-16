//grid component
import Phone from '../shared/Phone'
import Address from '../shared/Address'
import AppAccordion from '../../components/AppAccordion'

//react hooks
import { useState, useEffect } from "react";

const Providers = ({handlePersistence, item, configure}) => {

    //state
    const [name, setName] = useState('');
    const [cnpj, setCNPJ] = useState('');     

    const [elementsAddress, setElementsAddress] = useState([]);
    const [elementsPhone, setElementsPhone] = useState([]);
  
    //init
    useEffect(() => {             
   
      setName(item.name);
      setCNPJ(item.cnpj);                       

    }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps
  
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
        cnpj : cnpj	
      } 

      var itemAddress = elementsAddress[0]();
      data.address = itemAddress; 
      var itemPhone = elementsPhone[0]();
      data.phone = itemPhone;
      
      handlePersistence(data)
    }
  
    function handleGetItemAddress(getItem){
      const data = elementsAddress;    
      if (data.length === 0){
        data.push(getItem);  
        setElementsAddress(data);   
      }      
      else{
        data[0] = getItem    
      }      
    }

    function handleGetItemPhone(getItem){
      const data = elementsPhone;    
      if (data.length === 0)
      {
        data.push(getItem);
        setElementsPhone(data);
      }      
      else
      {
        data[0] = getItem    
      }     
    }

    return (
      <div>

        {/*
        (!units && !errorUnits && showWaiting) && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        }  
        {errorUnits && 
            <p className='error-message-edit'>{errorUnits}</p>
        */} 

        {item && 
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

            <label>CNPJ
              <input type="text"
                     className='input-edit input-edit-text'
                     name="cnpj"
                     value={cnpj}  
                     disabled={configure.disableInputs}
                     onChange={(e) => {
                                setCNPJ(e.target.value); 
                                handleResetTextValidation(e);
                              }
                     }
                     minLength={14} 
                     maxLength={14}         
                     required  
                     onInvalid={(e) => e.target.setCustomValidity("O CNPJ precisa ter 14 dígitos!")}        
              />
            </label>
              
            <AppAccordion open={true}
                          title={"Endereço"}
            >
              <Address configure={configure}
                        item={item?.address}
                        handleGetItem={handleGetItemAddress}
              >
              </Address>
            </AppAccordion>

            <AppAccordion open={true}
                          title={"Telefone"}
            >
              <Phone configure={configure}
                      item={item?.phone}
                      handleGetItem={handleGetItemPhone}
              >                          
              </Phone>
            </AppAccordion>

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
  
  export default Providers