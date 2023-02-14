//grid component
import MenuMenuItems from './MenuMenuItems'

//react hooks
import React from "react";
import {findDOMNode} from 'react-dom';
import ReactDOM from 'react-dom/client'
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const Menus = ({handlePersistence, item, configure}) => {

  //state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState(0);

  const [newItems, setNewItems] = useState([0]);
  const [elements, setElements] = useState([]);

  //ref
  const inputRef = useRef(null);

  //data
  const { data: menuItemsRecipe, 
          error: errorMenuItemRecipe,
          waiting: showWaitingMenuItemRecipe, 
          menuItemsRecipeGetAll } = useFetchMenuItemsRecipe();   
  const { data: menuItemsResale, 
          error: errorMenuItemResale, 
          waiting: showWaitingMenuItemResale,
          menuItemsResaleGetAll } = useFetchMenuItemsResale();  

  //init
  useEffect(() => {             
    
    menuItemsRecipeGetAll();
    menuItemsResaleGetAll();

    setName(item.name);
    setDescription(item.description);
    setState(item.state);

    const data = [...newItems];
    for (var i=0; i < item.menuMenuItems.length; i++){             
      data.push(data.length);            
    }
    setNewItems(data);

  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
  
    if (menuItemsRecipe?.length >= 0 &&
        menuItemsResale?.length >= 0){
      setTimeout(() => {
        for (var i=0; i < item.menuMenuItems.length; i++){               
          popItem(i, item.menuMenuItems[i]);
        }    
        if (inputRef.current !== null){              
          AccordionOpen(inputRef.current);              
        }
      }, 200); 
    }

  }, [menuItemsRecipe?.length, menuItemsResale?.length]); // eslint-disable-line react-hooks/exhaustive-deps

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
      state : state,
      menuMenuItems: []
    } 
    for (var i=0; i < elements.length; i++){
      var item = elements[i]();
      if (item !== null)
        data.menuMenuItems.push(item);      
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
          React.createElement(MenuMenuItems, {menuItems, handleGetItem, number: newItems.length - 1, item: null, configure})
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
          React.createElement(MenuMenuItems, {menuItems, handleGetItem, number, item, configure})
        }        
      </div>
    );
  }

  return (
    <div>        

      {showWaitingMenuItemRecipe && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorMenuItemRecipe && !showWaitingMenuItemRecipe &&
        <p className='error-message-edit'>{errorMenuItemRecipe}</p>
      } 

      {showWaitingMenuItemResale && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorMenuItemResale && !showWaitingMenuItemResale &&
        <p className='error-message-edit'>{errorMenuItemResale}</p>
      }

      {item && menuItemsRecipe && menuItemsResale && 
       !showWaitingMenuItemRecipe && !showWaitingMenuItemResale &&
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
                    
          <input type="checkbox"
                  className='input-edit'
                  name="state"
                  checked={state}  
                  disabled={configure.disableInputs}
                  onChange={(e) => setState(e.target.checked ? 1 : 0)}      
          />
          <label>Ativo</label> 
                            
          <div className='accordion-container'>
            <button ref={inputRef} className="accordion-button" onClick={handleAccordionClick}>Itens
              <BiDownArrow className='accordion-down'/>
              <BiUpArrow className='accordion-up'/>
            </button>
            <div className="accordion-panel" >              
             
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

export default Menus