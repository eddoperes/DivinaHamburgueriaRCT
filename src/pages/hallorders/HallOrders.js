//grid component
import HallOrdersMenuItems from './HallOrdersMenuItems'

//react hooks
import React from "react";
import {findDOMNode} from 'react-dom';
import ReactDOM from 'react-dom/client'
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const HallOrders = ({handlePersistence, item, configure}) => {

  //state
  const [userId, setUserId] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [observation, setObservation] = useState('');
  const [total, setTotal] = useState(0);
  const [state, setState] = useState(1);
  const [newItems, setNewItems] = useState([0]);
  const [elements, setElements] = useState([]);
  const [showWaiting, setShowWaiting] = useState(false);
  
  //ref
  const inputRef = useRef(null);

  //data
  const { data: customers, 
          error: errorCustomers, 
          customersGetAll } = useFetchCustomers();  
  if (customers === null) {customersGetAll()};  
  const { data: menuItemsRecipe, 
          error: errorMenuItemsRecipe, 
          menuItemsRecipeGetAll } = useFetchMenuItemsRecipe();  
  if (menuItemsRecipe === null) {menuItemsRecipeGetAll()};
  const { data: menuItemsResale, 
          error: errorMenuItemsResale, 
          menuItemsResaleGetAll } = useFetchMenuItemsResale();  
  if (menuItemsResale === null) {menuItemsResaleGetAll()};

  //init
  useEffect(() => {        
    
    if (item !== null && item !== undefined && 
        menuItemsRecipe !== null && menuItemsRecipe !== undefined &&
        menuItemsResale !== null && menuItemsResale !== undefined)
    {  

      if (total === 0){

        setCustomerId(item.customerId);
        setObservation(item.observation);
        setTotal(item.total);
        setState(item.state);
          
        const data = [...newItems];
        for (var i=0; i < item.hallOrderMenuItems.length; i++){             
          data.push(data.length);            
        }
        setNewItems(data);

        setTimeout(() => {
          for (var i=0; i < item.hallOrderMenuItems.length; i++){               
            popItem(i, item.hallOrderMenuItems[i]);
          }          
        }, 200); 

      }           

    }

    setTimeout(() => {
      if (inputRef.current !== null){              
        AccordionOpen(inputRef.current);              
      }
    }, 200); 

    setUserId(getUserId());
    
  }, [item, menuItemsRecipe, menuItemsResale]); // eslint-disable-line react-hooks/exhaustive-deps

  setTimeout(() => {
      setShowWaiting(true);
  }, 1000);

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
        customerId : customerId,
        observation : observation,
        total : total,
        state: state,
        hallOrderMenuItems: []
    } 
    for (var i=0; i < elements.length; i++){
      var item = elements[i]();
      if (item !== null)
        data.hallOrderMenuItems.push(item);      
    }
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
          React.createElement(HallOrdersMenuItems, {menuItems, handleGetItem, number: newItems.length - 1, item: null, configure})
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
          React.createElement(HallOrdersMenuItems, {menuItems, handleGetItem, number, item, configure})
        }        
      </div>
    );
  }

  return (
    <div>

      {(!menuItemsRecipe && !errorMenuItemsRecipe && showWaiting) && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorMenuItemsRecipe && 
        <p className='error-message-edit'>{errorMenuItemsRecipe}</p>
      } 

      {(!menuItemsResale && !errorMenuItemsResale && showWaiting) && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorMenuItemsResale && 
        <p className='error-message-edit'>{errorMenuItemsResale}</p>
      } 
      
      {(!customers && !errorCustomers && showWaiting) && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorCustomers &&  
        <p className='error-message-edit'>{errorCustomers}</p>
      } 
      {customers && menuItemsRecipe && menuItemsResale &&
        <form onSubmit={handleSubmit} className="form-edit">

          {item &&
            <label>Código
              <input type="number"
                    className='input-edit input-edit-number'
                    placeholder="Total"
                    value={item.id}  
                    disabled={configure.disableInputs}
                    readOnly
              />
            </label>
          }

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

export default HallOrders