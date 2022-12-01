//grid component
import PurchaseOrdersInventoryItems from './PurchaseOrdersInventoryItems'

//react hooks
import React from "react";
import {findDOMNode} from 'react-dom';
import ReactDOM from 'react-dom/client'
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { BsHourglassSplit } from 'react-icons/bs';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const PurchaseOrders = ({handlePersistence, item, configure}) => {

  //state
  const [providerId, setProviderId] = useState(1);
  const [observation, setObservation] = useState('');
  const [total, setTotal] = useState(0);
  const [state, setState] = useState(0);
  const [payment, setPayment] = useState(0);
  const [newItems, setNewItems] = useState([0]);
  const [elements, setElements] = useState([]);
  const [showWaiting, setShowWaiting] = useState(false);
  
  //ref
  const inputRef = useRef(null);

  //data
  const { data: providers, 
          error: errorProviders, 
          providersGetAll } = useFetchProviders();  
  if (providers === null) {providersGetAll()};  
  const { data: inventoryItems, 
          error: errorInventoryItems, 
          inventoryItemsGetAll } = useFetchInventoryItems();  
  if (inventoryItems === null) {inventoryItemsGetAll()};

  //init
  useEffect(() => {        
    
    if (item !== null && item !== undefined && 
        inventoryItems !== null && inventoryItems !== undefined)
    {  

      if (total === 0){

        setProviderId(item.providerId);
        setObservation(item.observation);
        setTotal(item.total);
        setState(item.state);
        setPayment(item.payment);
          
        const data = [...newItems];
        for (var i=0; i < item.purchaseOrderInventoryItems.length; i++){             
          data.push(data.length);            
        }
        setNewItems(data);

        setTimeout(() => {
          for (var i=0; i < item.purchaseOrderInventoryItems.length; i++){               
            popItem(i, item.purchaseOrderInventoryItems[i]);
          }          
        }, 200); 

      }           

    }

    setTimeout(() => {
      if (inputRef.current !== null){              
        AccordionOpen(inputRef.current);              
      }
    }, 200); 
    
  }, [item, inventoryItems]); // eslint-disable-line react-hooks/exhaustive-deps

  setTimeout(() => {
      setShowWaiting(true);
  }, 1000);

  //func
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("handleSubmit")

    var data;
    if (configure.showState)
    {
      data = {
        state: state,
        payment: payment
      } 
    }
    else 
    {
      data = {
        providerId : providerId,
        observation : observation,
        total : total,
        state: 1,
        payment: 1,
        purchaseOrderInventoryItems: []
      } 
      for (var i=0; i < elements.length; i++){
        data.purchaseOrderInventoryItems.push(elements[i]());      
      }
    }
    //handlePersistence(data)
  }

  function handleGetItem(number, getItem){
    const data = elements;    
    if (number === data.length)
    {
      data.push(getItem);
    }      
    else
    {
      data[number] = getItem    
    }
    setElements(data);
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

  const newItem = async (e) => {
    e.preventDefault();
    var root = ReactDOM.createRoot(document.getElementById(newItems.length - 1));    
    root.render(
      <div>    
        {
          React.createElement(PurchaseOrdersInventoryItems, {inventoryItems, handleGetItem, number: newItems.length - 1, item: null, configure})
        }        
      </div>
    );
    const data = [...newItems];
    data.push(data.length);
    setNewItems(data);
  }

  const popItem = async(number, item) => {
    var root = ReactDOM.createRoot(document.getElementById(number));    
    root.render(
      <div>    
        {
          React.createElement(PurchaseOrdersInventoryItems, {inventoryItems, handleGetItem, number, item, configure})
        }        
      </div>
    );
  }

  return (
    <div>

      {(!inventoryItems && !errorInventoryItems && showWaiting) && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorInventoryItems && 
        <p className='error-message-edit'>{errorInventoryItems}</p>
      } 
      
      {(!providers && !errorProviders && showWaiting) && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorProviders &&  
        <p className='error-message-edit'>{errorProviders}</p>
      } 
      {providers && inventoryItems &&
        <form onSubmit={handleSubmit} className="form-edit">

          <label > Fornecedor          
            <select value={providerId}
                    className="select-edit"
                    disabled={configure.disableInputs}
                    onChange={(e) => setProviderId(e.target.value)}                
            >
                {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                        {provider.name}
                    </option>                   
                ))}
            </select>          
          </label>

          <label > Observação          
            <textarea value={observation}
                      className="textarea-edit"
                      disabled={configure.disableInputs}
                      onChange={(e) => setObservation(e.target.value)}                
            >
            </textarea>          
          </label>

          <label>Total
            <input type="number"
                  className='input-edit input-edit-number'
                  placeholder="Total"
                  value={total}  
                  disabled={configure.disableInputs}
                  onChange={(e) => setTotal(e.target.value)} 
                  min={1}
            />
          </label>

          <div className='accordion-container'>
            <button ref={inputRef} className="accordion-button" onClick={handleAccordionClick}>
              Itens
              <BiDownArrow className='accordion-down'/>
              <BiUpArrow className='accordion-up'/>
            </button>
            <div className="accordion-panel">

              {newItems.map((newItem) => (
                  <div key={newItem} id={newItem}>                            
                  </div>                   
              ))}         
                
              <button onClick={newItem}
                      disabled = {configure.disableInputs}
                      className="input-edit-submit"
              >Adicionar</button>
              <div className="clear-both">                
              </div>

            </div>
          </div>

          {configure.showState &&
            <div>

              <label > Estado
                <select value={state}
                        className="select-edit"                    
                        onChange={(e) => setState(e.target.value)}                
                >                
                        <option value="1">
                            Cotação
                        </option> 
                        <option value="2">
                            Emitido
                        </option> 
                        <option value="3">
                            Cancelado
                        </option>
                        <option value="4">
                            Entregue
                        </option>
                        <option value="5">
                            Estocado
                        </option>                                 
                </select>          
              </label>

              <label > Pagamento
                <select value={payment}
                        className="select-edit"                    
                        onChange={(e) => setPayment(e.target.value)}                
                >                
                        <option value="1">
                            Aberto
                        </option> 
                        <option value="2">
                            Pago
                        </option>                                                      
                </select>          
              </label>

            </div>
          }

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

export default PurchaseOrders