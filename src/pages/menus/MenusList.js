//react hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchMenus } from "../../hooks/useFetchMenus";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icons
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const MenusList = () => {

    //state
    const [name, setName] = useState('');
    const [showWaiting, setShowWaiting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //ref
    const nameTxtRef = useRef(null);
    const nameRdbRef = useRef(null);
    const nameRdbQqRef = useRef(null);

    //data
    const { data: items, error, menusGetByName, unauthorized:unauthorizedItem} = useFetchMenus();
    const { set: localStorageSet , get: localStorageGet } = useFetchLocalStorage();

    //init
    const navigate = useNavigate();

    useEffect(() => {   

        if (items === null){

                if (name === localStorageGet("name") && 
                    name !== "" )
                    return;

                if(localStorageGet("namemenuChecked") === "" &&
                   localStorageGet("namemenuQQChecked") === "")
                {
                    localStorageSet("namemenuQqChecked", true);
                    nameRdbQqRef.current.checked = true;
                    nameTxtRef.current.disabled = true;                    
                    return;
                }                                                     

                setName(localStorageGet("namemenu"));
                if (localStorageGet("namemenuChecked") === true){
                    nameRdbRef.current.checked = true;
                    nameTxtRef.current.disabled = false;
                }
                if (localStorageGet("namemenuQqChecked") === true){
                    nameRdbQqRef.current.checked = true;
                    nameTxtRef.current.disabled = true;
                }

                var sendName = "";
                if (nameRdbRef.current.checked)
                    sendName = localStorageGet("namemenu"); 
                menusGetByName(sendName);

        }    
    }, [localStorageGet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {          
        if (unauthorizedItem){
            navigate("/login");
        }    
    }, [unauthorizedItem]); // eslint-disable-line react-hooks/exhaustive-deps


    //func
    async function  handleSubmit(e){
        e.preventDefault();
        setTimeout(() => {
            setShowWaiting(true);
            setRefreshing(true);
        }, 1000);        

        var sendName = "";
        if (nameRdbRef.current.checked)
            sendName = name 
        await menusGetByName(sendName);

        setRefreshing(false);
        localStorageSet("namemenu", name);
        localStorageSet("namemenuChecked", nameRdbRef.current.checked);
        localStorageSet("namemenuQqChecked", nameRdbQqRef.current.checked);

    }

    return(
        <div>

            <h1 className='h1-list'>
                Cardápios
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
                <Link to={'/Menus/New'}>
                    <button className='button-new-list'>
                        <VscNewFile/>
                    </button>                
                </Link>     
            </div>

            {(!items && (!error || refreshing) && showWaiting) && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }            
            {!items && error && !refreshing && 
                <p className='error-message-list'>{error}</p>
            }           
                
            {(items) && <div className='card-container'>
               {items.map((item) => (
                    <div className='card' key={item.id}>
                        <div>
                            {item.name}
                        </div>                        
                        <div>
                            <Link to={`/Menus/Edit/${item.id}`}>
                                <button className='button-edit-list'>
                                    <AiFillEdit />
                                </button>                       
                            </Link>                                                    
                            <Link to={`/Menus/Remove/${item.id}`}>
                                <button className='button-remove-list'>
                                    <AiFillDelete />    
                                </button>                    
                            </Link>                                                                                
                        </div>                    
                    </div>                    
                ))}
            </div>}

        </div>
    );

}

export default MenusList;