//react hooks
import { findDOMNode } from 'react-dom';
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchUnits } from "../../hooks/useFetchUnits";

//icons
import { BsHourglassSplit } from 'react-icons/bs';
import { BiDownArrow, BiUpArrow } from 'react-icons/bi';

const InventoryItems = ({handlePersistence, item, configure}) => {

  //state
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [conteudo, setConteudo] = useState(0);
  const [unidadeId, setUnidadeId] = useState(1);
  const [type, setType] = useState(1); 
  const [showWaiting, setShowWaiting] = useState(false);
  //const [accordionPanelStyle, setAccordionPanelStyle] = useState({});

  //ref
  const inputRef = useRef(null);

  //data
  const { data: units, 
          error: errorUnits, 
          unitsGetAll } = useFetchUnits();  
  if (units === null) {unitsGetAll()};

  //init
  setTimeout(() => {
      setShowWaiting(true);
  }, 1000);

  useEffect(() => {             
    if (item !== null && item !== undefined)
    {        
        setNome(item.name);
        setMarca(item.brand);
        setConteudo(item.content);
        setUnidadeId(item.unityId);
        setType(item.type);                 
    }
    setTimeout(() => {
      if (inputRef.current !== null){              
        AccordionOpen(inputRef.current);    
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
      name : nome,
      brand : marca,
      content : conteudo,
      unityId : unidadeId,
      type: type
    } 
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

  return (
    <div>
      {(!units && !errorUnits && showWaiting) && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorUnits && 
        <p className='error-message-edit'>{errorUnits}</p>
      } 
      {units && 
        <form onSubmit={handleSubmit} className="form-edit">
      
          <label htmlFor="nome">Nome
            <input type="text"
                  className='input-edit input-edit-text'
                  name="nome"
                  placeholder="Nome"
                  value={nome}  
                  disabled={configure.disableInputs}
                  onChange={(e) => {
                              setNome(e.target.value); 
                              handleResetTextValidation(e);
                            }
                  }
                  maxLength={20}         
                  required  
                  onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
            />
          </label>

          <div className='accordion-container'>
            <button ref={inputRef} className="accordion-button" onClick={handleAccordionClick}>Marca
              <BiDownArrow className='accordion-down'/>
              <BiUpArrow className='accordion-up'/>
            </button>
            <div className="accordion-panel" >              
              <label htmlFor="marca">Marca
                <input type="text"
                    className='input-edit input-edit-text'
                    placeholder="Marca"
                    value={marca}  
                    disabled={configure.disableInputs}
                    onChange={(e) => setMarca(e.target.value)} 
                />
              </label>
            </div>
          </div>

          <label htmlFor="conteudo">Conteúdo
            <input type="number"
                  className='input-edit input-edit-number'
                  placeholder="Conteúdo"
                  value={conteudo}  
                  disabled={configure.disableInputs}
                  onChange={(e) => setConteudo(e.target.value)} 
                  min={1}
                  max={1000}
            />
          </label>

          <label htmlFor="unidade">Unidade          
            <select value={unidadeId}  
                    className="select-edit"
                    disabled={configure.disableInputs}
                    onChange={(e) => setUnidadeId(e.target.value)}                
            >
                {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>
                        {unit.name}
                    </option>                   
                ))}
            </select>          
          </label>

          <label htmlFor="type">Tipo
            <select value={type}  
                    className="select-edit"
                    disabled={configure.disableInputs}
                    onChange={(e) => setType(e.target.value)}                
            >
                    <option value="1">Receita</option>                   
                    <option value="2">Revenda</option>                   
            </select>      
          </label>              

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

export default InventoryItems