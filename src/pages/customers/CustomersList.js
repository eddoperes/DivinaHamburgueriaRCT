//react hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icons
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const CustomersList = () => {

    //state
    const [name, setName] = useState('');

    //ref
    const nameTxtRef = useRef(null);
    const nameRdbRef = useRef(null);
    const nameRdbQqRef = useRef(null);

    //data
    const { data: items, error, customersGetByName, unauthorized:unauthorizedItem, waiting: showWaiting} = useFetchCustomers();
    const { set: localStorageSet , get: localStorageGet } = useFetchLocalStorage();

    //init
    const navigate = useNavigate();
    
    useEffect(() => {   

        if(localStorageGet("nameCustomerChecked") === "" &&
            localStorageGet("nameCustomerQqChecked") === "")
        {
            localStorageSet("nameCustomerQqChecked", true);
            nameRdbQqRef.current.checked = true;
            nameTxtRef.current.disabled = true;                   
            return;
        }                                                     

        setName(localStorageGet("nameCustomer"));
        if (localStorageGet("nameCustomerChecked") === true){
            nameRdbRef.current.checked = true;
            nameTxtRef.current.disabled = false;
        }
        if (localStorageGet("nameCustomerQqChecked") === true){
            nameRdbQqRef.current.checked = true;
            nameTxtRef.current.disabled = true;
        }

        var sendName = "";
        if (nameRdbRef.current.checked)
            sendName = localStorageGet("nameCustomer"); 
        
        customersGetByName(sendName);
  
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {          
        if (unauthorizedItem){
            navigate("/login");
        }    
    }, [unauthorizedItem]); // eslint-disable-line react-hooks/exhaustive-deps

    //func
    async function  handleSubmit(e){

        e.preventDefault();       

        var sendName = "";
        if (nameRdbRef.current.checked)
             sendName = name 
        await customersGetByName(sendName);

        localStorageSet("nameCustomer", name);
        localStorageSet("nameCustomerChecked", nameRdbRef.current.checked);
        localStorageSet("nameCustomerQqChecked", nameRdbQqRef.current.checked);

    }

    return(
        <div>

            <h1 className='h1-list'>
                Clientes
            </h1>        
       
            <form className="form-list" onSubmit={handleSubmit}>
              
                <div className="main-filter">

                    <div className="left-filter">

                        <label>
                            <input type="radio"  
                                   ref={nameRdbRef}                                   
                                   className="input-list"
                                   onChange={(e) => {
                                                        nameTxtRef.current.disabled = false;
                                                    }}                        
                                   id="name" 
                                   name="name" 
                                   value={nameTxtRef.current?.value} />
                            Nome
                        </label>

                        <input type="text"
                               ref={nameTxtRef}
                               className="input-list input-list-text"
                               onChange={(e) => setName(e.target.value)}
                               value={name}
                        />
                    </div>

                    <div className="right-filter">
                        <label>
                            <input type="radio" 
                                   ref={nameRdbQqRef}   
                                   className="input-list"
                                   onChange={(e) => {
                                                    nameTxtRef.current.disabled = true;
                                                 }}                       
                                   id="name" 
                                   name="name" 
                                   value=""  />
                            Qualquer
                        </label>
                    </div>

                </div>               

                <div>
                    <input type="submit" 
                           className="input-list-submit" 
                           value="Pesquisar" >                    
                    </input>
                </div> 
                <div className='clear-both'>
                </div>       
            </form>

            <div className='button-new-list-container'>
                <Link to={'/Customers/New'}>
                    <button className='button-new-list'>
                        <VscNewFile/>
                    </button>                
                </Link>     
            </div>

            {showWaiting && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }            
            {error && !showWaiting && 
                <p className='error-message-list'>{error}</p>
            }
                          
            {items && !showWaiting && 
                <div className='card-container'>
                    {items.map((item) => (
                        <div className='card' key={item.id}>
                            <div>
                                {item.name}
                            </div>                                               
                            <div>
                                <Link to={`/Customers/Edit/${item.id}`}>
                                    <button className='button-edit-list'>
                                        <AiFillEdit />
                                    </button>                       
                                </Link>                                                    
                                <Link to={`/Customers/Remove/${item.id}`}>
                                    <button className='button-remove-list'>
                                        <AiFillDelete />    
                                    </button>                    
                                </Link>                                                                                
                            </div>                    
                        </div>                    
                    ))}
                </div>
            }

        </div>
    );

}

export default CustomersList;