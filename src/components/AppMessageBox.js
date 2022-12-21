import './AppMessageBox.css';

import React from 'react'
import { useEffect, useState } from "react";

const AppMessageBox = ({handleConfirmed, handleRegister}) => {

  const [id, setId] = useState(0);
  const [state, setState] = useState(0);
  const [payment, setPayment] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageX, setPageX] = useState(0);
  const [pageY, setPageY] = useState(0);
  const [typeColor, setTypeColor] = useState('#ccc');
  const [message, setMessage] = useState('#ccc');

  useEffect(() =>{
    handleRegister(show);
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  function show(id, state, payment, pageX, pageY, typeName, message){
    if (typeName === 'danger')
      setTypeColor('#ffeeee');
    else if (typeName === 'info')
      setTypeColor('#eeffff');
    else if (typeName === 'warning')
      setTypeColor('#ffffee');
    setId(id);
    setState(state);
    setPayment(payment);
    setMessage(message);
    setVisible(true);
    if (pageX > (window.parent.innerWidth * 0.75))
      pageX = pageX * 0.75;
    setPageX(pageX);
    setPageY(pageY);
  }

  async function handleYes(e){
    e.preventDefault();
    await handleConfirmed(id, state, payment);
    setVisible(false);
  }

  async function handleNo(e){
    e.preventDefault();
    setVisible(false);
  }

  return (
    <div>
      {visible &&
        <div className='box' style={{top: pageY, 
                                     left: pageX, 
                                     backgroundColor: typeColor}}>
          <div className='message'>
            <span>{message}</span>    
          </div>          
          <div>
            <button className='button' onClick={(e) => handleYes(e)}>
              Sim
            </button>
            <button className='button' onClick={(e) => handleNo(e)}>
              Não
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default AppMessageBox