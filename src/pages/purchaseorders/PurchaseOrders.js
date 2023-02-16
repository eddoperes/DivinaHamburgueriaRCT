//grid component
import PurchaseOrdersInventoryItems from './PurchaseOrdersInventoryItems'
import AppAccordion from '../../components/AppAccordion'

//react hooks
import React from "react";
import ReactDOM from 'react-dom/client'
import { useState, useEffect } from "react";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const PurchaseOrders = ({handlePersistence, item, configure}) => {

  //state
  const [providerId, setProviderId] = useState(1);
  const [observation, setObservation] = useState('');
  const [total, setTotal] = useState(0);
  const [state, setState] = useState(1);
  const [payment, setPayment] = useState(1);
  const [newItems, setNewItems] = useState([0]);
  const [elements, setElements] = useState([]);
  
  //data
  const { data: providers, 
          error: errorProviders, 
          waiting: showWaitingProviders,
          providersGetAll } = useFetchProviders();   
  const { data: inventoryItems, 
          error: errorInventoryItems, 
          waiting: showWaitingInventoryItems,
          inventoryItemsGetAll } = useFetchInventoryItems();  

  //init
  useEffect(() => {     
    
    providersGetAll();
    inventoryItemsGetAll();

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

  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
  
    if (inventoryItems?.length >= 0 &&
        providers?.length >= 0){

      setTimeout(() => {
        for (var i=0; i < item.purchaseOrderInventoryItems.length; i++){               
          popItem(i, item.purchaseOrderInventoryItems[i]);
        }     
      }, 200); 
    }

  }, [inventoryItems?.length, providers?.length]); // eslint-disable-line react-hooks/exhaustive-deps

  //func
  const handleSubmit = async (e) => {
    e.preventDefault();    
    var data = {
        providerId : providerId,
        observation : observation,
        total : total,
        state: state,
        payment: payment,
        purchaseOrderInventoryItems: []
      } 
    for (var i=0; i < elements.length; i++){
      var item = elements[i]();
      if (item !== null)
        data.purchaseOrderInventoryItems.push(item);      
    }
    //console.log(data);
    handlePersistence(data)
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

      {showWaitingInventoryItems && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorInventoryItems && !showWaitingInventoryItems &&
        <p className='error-message-edit'>{errorInventoryItems}</p>
      } 
      
      {showWaitingProviders && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorProviders &&  !showWaitingProviders &&
        <p className='error-message-edit'>{errorProviders}</p>
      } 

      {item && providers && inventoryItems &&
       !showWaitingInventoryItems && !showWaitingProviders &&

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

          <AppAccordion open={true}
                        title={"Itens"}
          >
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
          </AppAccordion>

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