//react hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";
import { useFetchAlarms } from "../../hooks/useFetchAlarms";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icones
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';        

const AlarmsList = () => {

    //state
    const [eatableId, setEatableId] = useState(1);
    const [showWaiting, setShowWaiting] = useState(false);
    const [showWaitingEatables, setShowWaitingEatables] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //ref
    const eatableSelRef = useRef(null);
    const eatableRdbRef = useRef(null);
    const eatableRdbQqRef = useRef(null);

    //data
    const { data: eatables, error: errorEatables, unauthorized: unauthorizedEatables, inventoryItemsGetDistinctNames} = useFetchInventoryItems();    
    if (eatables === null) {
        setTimeout(() => {
            setShowWaitingEatables(true);
        }, 1000);
        inventoryItemsGetDistinctNames();        
    }
    const { data: items, error, alarmsGetByEatable, unauthorized: unauthorizedItem} = useFetchAlarms();
    const { set: localStorageSet , get: localStorageGet } = useFetchLocalStorage();

    //init
    const navigate = useNavigate();

    useEffect(() => {          
        
        if (eatables !== null &&                         
            items === null){

            if (eatableId === localStorageGet("eatableIdAlarm"))
                return;

            if(localStorageGet("eatableIdAlarmChecked") === "" &&
               localStorageGet("eatableIdAlarmQqChecked") === "")
            {
                localStorageSet("eatableIdAlarmQqChecked", true);
                eatableRdbQqRef.current.checked = true;
                eatableSelRef.current.disabled = true;                
                return;
            }     

            setEatableId(localStorageGet("eatableIdAlarm"));            
            if (localStorageGet("eatableIdAlarmChecked") === true){
                eatableRdbRef.current.checked = true;
                eatableSelRef.current.disabled = false;
            }
            if (localStorageGet("eatableIdAlarmQqChecked") === true){
                eatableRdbQqRef.current.checked = true;
                eatableSelRef.current.disabled = true;
            }           

            var sendEatableId = 0;
            if (eatableRdbRef.current.checked)
                sendEatableId = localStorageGet("eatableIdAlarmId"); 
            alarmsGetByEatable(sendEatableId);
            
        }
            
    }, [localStorageGet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {          
        if (unauthorizedItem || unauthorizedEatables){
            navigate("/login");
        }    
    }, [unauthorizedItem, unauthorizedEatables]); // eslint-disable-line react-hooks/exhaustive-deps

    //func
    function GetEatableName(id){
        return eatables.filter(e => e.id === id)[0].name;
    }

    async function  handleSubmit(e){
        e.preventDefault();
        setTimeout(() => {
            setShowWaiting(true);
            setRefreshing(true);
            //console.log('passo8')
        }, 1000); 

        var sendEatableId = 0;
        if (eatableRdbRef.current.checked)
             sendEatableId = eatableId                      
        await alarmsGetByEatable(sendEatableId);

        setRefreshing(false);
        localStorageSet("eatableIdAlarm", eatableId);
        localStorageSet("eatableIdAlarmChecked", eatableRdbRef.current.checked);
        localStorageSet("eatableIdAlarmQqChecked", eatableRdbQqRef.current.checked);
    }

    return (
        <div>

            <h1 className='h1-list'>
                Alarmes
            </h1> 
            
            <form className="form-list" onSubmit={handleSubmit}>

                <div className="main-filter">
                
                    <div className="left-filter">
                
                        <label>
                            <input type="radio"     
                                    ref={eatableRdbRef}
                                    className="input-list"
                                    onChange={(e) => {eatableSelRef.current.disabled = false;}}                        
                                    id="id" 
                                    name="id" 
                                    />
                            Comestível
                        </label>
                                
                        <select value={eatableId}
                                ref={eatableSelRef}
                                className="select-list"
                                onChange={(e) => setEatableId(e.target.value)}                
                        >
                            {eatables && eatables.map((eatable) => (
                                <option key={eatable.id} value={eatable.id}>
                                    {eatable.name}
                                </option>                   
                            ))}
                        </select>          

                    </div>

                    <div className="right-filter">

                        <label>
                            <input type="radio" 
                                    ref={eatableRdbQqRef}
                                    className="input-list"
                                    onChange={(e) => {eatableSelRef.current.disabled = true;}}                        
                                    id="id" 
                                    name="id" 
                                    value="0"  />
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
                <Link to={'/Alarms/New'}>
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
            {(!eatables && (!errorEatables || refreshing) && showWaitingEatables) && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {!eatables && errorEatables && !refreshing &&  
                <p className='error-message-list'>{errorEatables}</p>
            }

            {(items && eatables) && <div className='card-container'>

                {items.map((item) => (
                    <div className='card' key={item.id}>
                        <div>
                            {GetEatableName(item.eatableId)}
                        </div>                        

                        <div>
                            <Link to={`/Alarms/Edit/${item.id}`}>
                                <button className='button-edit-list'>
                                    <AiFillEdit />
                                </button>    
                            </Link> 
                            <Link to={`/Alarms/Remove/${item.id}`}>
                                <button className='button-remove-list'>
                                    <AiFillDelete />    
                                </button>                    
                            </Link>
                        </div>       
                    </div>                    
                )
            )}
            </div>}

        </div>
    )

}

export default AlarmsList