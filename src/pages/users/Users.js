//react hooks
import { useState, useEffect } from "react";

//data hooks

//icons
//import { BsHourglassSplit } from 'react-icons/bs';

const Users = ({handlePersistence, item, configure}) => {

    //state
    const [name, setName] = useState('');  
    const [type, setType] = useState(1);
    const [state, setState] = useState(1);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');   

    //init
    useEffect(() => {             
     
      setName(item.name);  
      setType(item.type);  
      setState(item.state);
      setEmail(item.email);        

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
        name : name,
        type: type,
        state : state,
        email : email,  
        password : password,      
      } 
      handlePersistence(data)
    }
  
    return (
      <div>

        {/*
        (!units && !errorUnits && showWaiting) && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        }  
        {errorUnits && 
            <p className='error-message-edit'>{errorUnits}</p>
        */} 

        {item && 
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

            <label htmlFor="type">Tipo
              <select value={type}  
                      className="select-edit" 
                      disabled={configure.disableInputs}
                      onChange={(e) => setType(e.target.value)}                
              >
                      <option value="1">Administrador</option>                   
                      <option value="2">Auxiliar</option> 
                      <option value="3">Caixa</option>                                     
              </select>      
            </label> 

            <div>
              <label>
                  <input type="checkbox"
                          className='input-edit'
                          name="state"
                          checked={state}  
                          disabled={configure.disableInputs}
                          onChange={(e) => setState(e.target.checked ? 1 : 0)}      
                  />
              Ativo</label> 
            </div>

            <label>E-mail
              <input type="email"
                    className='input-edit input-edit-text'
                    name="email"
                    value={email}  
                    disabled={configure.disableInputs}
                    onChange={(e) => {
                                setEmail(e.target.value); 
                                handleResetTextValidation(e);
                              }
                    }
                    maxLength={30}         
                    required  
                    onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
              />
            </label>

            {configure.showPassword &&
              <label>Password
                <input type="password"
                      className='input-edit input-edit-text'
                      name="password"
                      value={password}  
                      disabled={configure.disableInputs}
                      onChange={(e) => {
                                  setPassword(e.target.value); 
                                  handleResetTextValidation(e);
                                }
                      }
                      maxLength={30}         
                      required  
                      onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
                />
              </label>
            }
        
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
  
  export default Users