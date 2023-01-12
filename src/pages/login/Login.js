//react hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchLogin } from "../../hooks/useFetchLogin";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const Login = () => {

  //state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWaiting, setShowWaiting] = useState(false);

  //data
  const { data: loginData, error: loginError, login } = useFetchLogin(); 
  const { set: localStorageSet } = useFetchLocalStorage();

  //init
  const navigate = useNavigate();

  useEffect(() => {                
    if (loginData !== null)
    {                
      localStorageSet("token", loginData.token); 
      navigate("/");                 
    } 
  }, [loginData]); // eslint-disable-line react-hooks/exhaustive-deps

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
      email : email,
      password: password
    };
    setTimeout(() => {
      setShowWaiting(true);
    }, 1000);
    await login(data);
  }

  return (
    <div>

      <h1 className='h1-edit'>Login</h1>

      <form onSubmit={handleSubmit} className="form-edit">

        <label>E-mail
          <input type="text"
                className='input-edit input-edit-text'
                name="email"
                value={email}  
                onChange={(e) => {
                            setEmail(e.target.value); 
                            handleResetTextValidation(e);
                          }
                }
                maxLength={20}         
                required  
                onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
            />
        </label>

        <label>Password
          <input type="password"
                className='input-edit input-edit-text'
                name="password"
                value={password}  
                onChange={(e) => {
                            setPassword(e.target.value); 
                            handleResetTextValidation(e);
                          }
                }
                maxLength={20}         
                required  
                onInvalid={(e) => e.target.setCustomValidity("Este campo precisa ser preenchido!")}        
            />
        </label>

        <div>
          <input type="submit" 
                 value="Enviar"
                 className="input-edit-submit"
          />
          <div className="clear-both">
          </div>
        </div>

      </form>

      {(!loginData && !loginError && showWaiting) && 
        <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      }  
      {loginError && 
        <p className='error-message-edit'>{loginError}</p>
      } 

    </div>

  )
}

export default Login