import './AppAccordion.css';

//import React from 'react'
import {findDOMNode} from 'react-dom';
import { useRef, useEffect } from "react";

//icons
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const AppAccordion = ({children, open, title}) => {

  //init
  useEffect(()=>{

    if (open){
      setTimeout(() => {   
        if (inputRef.current !== null){              
          AccordionOpen(inputRef.current);              
        }
      }, 200); 
    }
    
  },[open])

  //ref
  const inputRef = useRef(null);

  //func
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

  return (
    <div className='accordion-container'>
      <button ref={inputRef} className="accordion-button" onClick={handleAccordionClick}>
        {title}
        <BiDownArrow className='accordion-down'/>
        <BiUpArrow className='accordion-up'/>
      </button>
      <div className="accordion-panel">
        {children}
      </div>     
    </div>
  )

}

export default AppAccordion