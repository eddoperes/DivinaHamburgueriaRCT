//grid component
import DeliveryOrdersMenuItems from './DeliveryOrdersMenuItems'

//react hooks
import React from "react";
import {findDOMNode} from 'react-dom';
import ReactDOM from 'react-dom/client'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const DeliveryOrders = ({handlePersistence, item, configure}) => {

  //state
  const [userId, setUserId] = useState(0);
  const [customerId, setCustomerId] = useState('');
  const [observation, setObservation] = useState('');
  const [total, setTotal] = useState(0);
  const [state, setState] = useState(1);
  const [payment, setPayment] = useState(1);
  const [newItems, setNewItems] = useState([0]);
  const [elements, setElements] = useState([]);
  
  //ref
  const inputRef = useRef(null);

  //data
  const { data: customers, 
          error: errorCustomers, 
          waiting: showWaitingCustomer,
          unauthorized: unauthorizedCustomer,
          customersGetAll } = useFetchCustomers();  
  const { data: menuItemsRecipe, 
          error: errorMenuItemsRecipe, 
          waiting: showWaitingMenuItemsRecipe,
          unauthorized: unauthorizedMenuItemsRecipe,
          menuItemsRecipeGetAll } = useFetchMenuItemsRecipe();  
  const { data: menuItemsResale, 
          error: errorMenuItemsResale, 
          waiting: showWaitingMenuItemsResale,
          unauthorized: unauthorizedMenuItemsResale,
          menuItemsResaleGetAll } = useFetchMenuItemsResale();  

  //init
  const navigate = useNavigate();

  useEffect(() => {        

    menuItemsRecipeGetAll()
    menuItemsResaleGetAll()
    customersGetAll()
    
    setCustomerId(item.customerId === null ? '' : item.customerId);
    setObservation(item.observation);
    setTotal(item.total);
    setState(item.state);
    setPayment(item.payment);
    setUserId(getUserId());
          
    const data = [...newItems];
    for (var i=0; i < item.deliveryOrderMenuItems.length; i++){             
      data.push(data.length);            
    }
    setNewItems(data);
      
  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps  

  useEffect(() => {
  
    if (menuItemsRecipe?.length >= 0 &&
        menuItemsResale?.length >= 0){
      setTimeout(() => {
        for (var k=0; k < item.deliveryOrderMenuItems.length; k++){               
          popItem(k, item.deliveryOrderMenuItems[k]);
        }  
        if (inputRef.current !== null){              
          AccordionOpen(inputRef.current);              
        }
      }, 200); 
    }

  }, [menuItemsRecipe?.length, menuItemsResale?.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {          
    if (unauthorizedCustomer || unauthorizedMenuItemsRecipe || unauthorizedMenuItemsResale){
        navigate("/login");
    }    
  }, [unauthorizedCustomer, unauthorizedMenuItemsRecipe, unauthorizedMenuItemsResale]); // eslint-disable-line react-hooks/exhaustive-deps

  //func
  const getUserId = () => {
    const value = window.localStorage.getItem("token");
    if (value === null)
        return 0;
    else
        return JSON.parse(value).userId;
  } 

  const handleSubmit = async (e) => {
    e.preventDefault();    
    var data = {
        userId: userId,
        customerId : customerId === '' ? null : customerId,
        observation : observation,
        total : total,
        state: state,
        payment: payment,
        deliveryOrderMenuItems: []
    } 
    for (var i=0; i < elements.length; i++){
      var item = elements[i]();
      if (item !== null)
        data.deliveryOrderMenuItems.push(item);      
    }    
    handlePersistence(data);
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
    var menuItems = menuItemsRecipe.concat(menuItemsResale);
    root.render(
      <div>    
        {
          React.createElement(DeliveryOrdersMenuItems, {menuItems, handleGetItem, number: newItems.length - 1, item: null, configure})
        }        
      </div>
    );
    const data = [...newItems];
    data.push(data.length);
    setNewItems(data);
  }

  const popItem = async(number, item) => {
    var root = ReactDOM.createRoot(document.getElementById(number));    
    var menuItems = menuItemsRecipe.concat(menuItemsResale);
    root.render(
      <div>    
        {
          React.createElement(DeliveryOrdersMenuItems, {menuItems, handleGetItem, number, item, configure})
        }        
      </div>
    );
  }

  return (
    <div>

      {showWaitingMenuItemsRecipe && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorMenuItemsRecipe && !showWaitingMenuItemsRecipe &&
        <p className='error-message-edit'>{errorMenuItemsRecipe}</p>
      } 

      {showWaitingMenuItemsResale && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorMenuItemsResale && !showWaitingMenuItemsResale &&
        <p className='error-message-edit'>{errorMenuItemsResale}</p>
      } 
      
      {showWaitingCustomer && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorCustomers && !showWaitingCustomer &&
        <p className='error-message-edit'>{errorCustomers}</p>
      } 

      {item && customers && menuItemsRecipe && menuItemsResale &&
       !showWaitingMenuItemsRecipe && !showWaitingMenuItemsResale && !showWaitingCustomer &&

        <form onSubmit={handleSubmit} className="form-edit">

          {item.id > 0 &&
            <label>Código
              <input type="number"
                     className='input-edit input-edit-number'
                     value={item.id}  
                     disabled={configure.disableInputs}
                     readOnly
              />
            </label>
          }

          <label>Cliente
            <select value={customerId}
                    className="select-edit input-edit-number"
                    onChange={(e) => setCustomerId(e.target.value)}   
                    required            
            >
                <option key={undefined} value="">
                        {'...'}
                </option>
                {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                        {customer.name}
                    </option>                   
                ))}
            </select>          
          </label>

          <label>Observação          
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

export default DeliveryOrders