//react hooks
import { useState, useEffect } from "react";

//data hooks
import { useFetchUnits } from "../../hooks/useFetchUnits";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const InventoryItems = ({handlePersistence, item, configure}) => {

  //state
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [conteudo, setConteudo] = useState(0);
  const [unidadeId, setUnidadeId] = useState(1);
  const [type, setType] = useState(1); 

  //data
  const { data: units, 
          error: errorUnits, 
          waiting: showWaitingUnits,
          unitsGetAll } = useFetchUnits();  

  useEffect(() => {             

    unitsGetAll();

    setNome(item.name);
    setMarca(item.brand);
    setConteudo(item.content);
    setUnidadeId(item.unityId);
    setType(item.type);                 
 
  }, [item.id]); // eslint-disable-line react-hooks/exhaustive-deps

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

  return (
    <div>

      {showWaitingUnits && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {errorUnits && !showWaitingUnits &&
        <p className='error-message-edit'>{errorUnits}</p>
      } 

      {units && !showWaitingUnits &&
        <form onSubmit={handleSubmit} className="form-edit">
      
          <label htmlFor="nome">Nome
            <input type="text"
                  className='input-edit input-edit-text'
                  name="nome"
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
            
          <label htmlFor="marca">Marca
            <input type="text"
                className='input-edit input-edit-text'
                value={marca}  
                disabled={configure.disableInputs}
                onChange={(e) => setMarca(e.target.value)} 
            />
          </label>

          <label htmlFor="conteudo">Conteúdo
            <input type="number"
                  className='input-edit input-edit-number'
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