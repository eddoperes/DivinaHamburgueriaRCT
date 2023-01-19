//grid component
import Phone from '../shared/Phone'
import Address from '../shared/Address'

//react hooks
import { findDOMNode } from 'react-dom';
import { useState, useEffect, useRef } from "react";

//data hooks

//icons
//import { BsHourglassSplit } from 'react-icons/bs';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const Providers = ({handlePersistence, item, configure}) => {

    //state
    const [name, setName] = useState('');
    const [cnpj, setCNPJ] = useState('');     

    const [elementsAddress, setElementsAddress] = useState([]);
    const [elementsPhone, setElementsPhone] = useState([]);
    //const [showWaiting, setShowWaiting] = useState(false);
  
    //ref
    const inputRefAddress = useRef(null);
    const inputRefPhone = useRef(null);
  
    //data

    //init
    //setTimeout(() => {
    //    setShowWaiting(true);
    //}, 1000);
  
    useEffect(() => {             
      if (item !== null && item !== undefined)
      {       
        setName(item.name);
        setCNPJ(item.cnpj);                       
      }
      setTimeout(() => {
        if (inputRefAddress.current !== null){              
          AccordionOpen(inputRefAddress.current);    
        }
        if (inputRefPhone.current !== null){              
          AccordionOpen(inputRefPhone.current);    
        }
      }, 200); 
    }, [item]);
  
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
  
    function handleAccordionClick(e){
      e.preventDefault();    
      var target = e.target; 
      for(var i=0; i<3; i++){
        var up = findDOMNode(target).getElementsByClassName('accordion-up'); 
        var down = findDOMNode(target).getElementsByClassName('accordion-down'); 
        if (up.length === 0) {target = target.parentNode;} else {break};      
      }
      target.classList.toggle("accordion-active");
      var panel = target.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
        up[0].style.display = "none";
        down[0].style.display = "block";
      } else {
        panel.style.display = "block";
        up[0].style.display = "block";
        down[0].style.display = "none";
      }
    } 
  
    function AccordionOpen(target){
      var up = findDOMNode(target).getElementsByClassName('accordion-up'); 
      var down = findDOMNode(target).getElementsByClassName('accordion-down'); 
      target.classList.add("accordion-active");
      var panel = target.nextElementSibling;
      panel.style.display = "block";
      up[0].style.display = "block";
      down[0].style.display = "none";
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

        {true && 
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
              
            <div className='accordion-container'>
              <button ref={inputRefAddress} className="accordion-button" onClick={handleAccordionClick}>Endereço
                <BiDownArrow className='accordion-down'/>
                <BiUpArrow className='accordion-up'/>
              </button>
              <div className="accordion-panel" >              
                <label>                  
                    <Address configure={configure}
                             item={item?.address}
                             handleGetItem={handleGetItemAddress}
                    >
                    </Address>
                </label>
              </div>
            </div>

            <div className='accordion-container'>
              <button ref={inputRefPhone} className="accordion-button" onClick={handleAccordionClick}>Telefone
                <BiDownArrow className='accordion-down'/>
                <BiUpArrow className='accordion-up'/>
              </button>
              <div className="accordion-panel" >              
                <label>                  
                    <Phone configure={configure}
                           item={item?.phone}
                           handleGetItem={handleGetItemPhone}
                    >                          
                    </Phone>
                </label>
              </div>
            </div>

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