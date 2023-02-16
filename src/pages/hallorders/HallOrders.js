//grid component
import HallOrdersMenuItems from './HallOrdersMenuItems';
import AppAccordion from '../../components/AppAccordion';

//react hooks
import React from "react";
import ReactDOM from 'react-dom/client'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const HallOrders = ({handlePersistence, item, configure}) => {

  //state
  const [userId, setUserId] = useState(0);
  const [customerId, setCustomerId] = useState(null);
  const [observation, setObservation] = useState('');
  const [total, setTotal] = useState(0);
  const [state, setState] = useState(1);
  const [newItems, setNewItems] = useState([0]);
  const [elements, setElements] = useState([]);

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

    setCustomerId(item.customerId);
    setObservation(item.observation);
    setTotal(item.total);
    setState(item.state);
    setUserId(getUserId());
          
    const data = [...newItems];
    for (var i=0; i < item.hallOrderMenuItems.length; i++){             
      data.push(data.length);            
    }
    setNewItems(data);

  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
  
    if (menuItemsRecipe?.length >= 0 &&
        menuItemsResale?.length >= 0){
      setTimeout(() => {
        for (var k=0; k < item.hallOrderMenuItems.length; k++){               
          popItem(k, item.hallOrderMenuItems[k]);
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

export default HallOrders