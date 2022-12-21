//react hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchUnits } from "../../hooks/useFetchUnits";
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";
import { useFetchInventories } from "../../hooks/useFetchInventories";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icons
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

const InventoryList = () => {

    //state
    const [eatableId, setEatableId] = useState('0');
    const [showWaiting, setShowWaiting] = useState(false);
    const [showWaitingUnits, setShowWaitingUnits] = useState(false);
    const [showWaitingInventoryItems, setShowWaitingInventoryItems] = useState(false);
    const [showWaitingEatables, setShowWaitingEatables] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //ref
    const eatableSelRef = useRef(null);
    const eatableRdbRef = useRef(null);
    const eatableRdbQqRef = useRef(null);

    //data
    const { data: units, error: errorUnits, unitsGetAll, unauthorized: unauthorizedUnits} = useFetchUnits();    
    if (units === null) {
        setTimeout(() => {
            setShowWaitingUnits(true);
        }, 1000);
        unitsGetAll();        
    }
    const { data: inventoryItems, error: errorInventoryItems, inventoryItemsGetAll} = useFetchInventoryItems();    
    if (inventoryItems === null) {
        setTimeout(() => {
            setShowWaitingInventoryItems(true);
        }, 1000);
        inventoryItemsGetAll();        
    }
    const { data: eatables, error: errorEatables, inventoryItemsGetDistinctNames} = useFetchInventoryItems();    
    if (eatables === null) {
        setTimeout(() => {
            setShowWaitingEatables(true);
        }, 1000);
        inventoryItemsGetDistinctNames();        
    }
    const {data: items, error, inventoryGetByEatable, unauthorized: unauthorizedItem} = useFetchInventories();
    const {set: localStorageSet , get: localStorageGet} = useFetchLocalStorage();

    //init
    const navigate = useNavigate();

    useEffect(() => {          

        if (units !== null && 
            eatables !== null && 
            inventoryItems !== null && 
            items === null){

            if (eatableId === localStorageGet("eatableId"))
                return;

            setEatableId(localStorageGet("eatableId"));
            if (localStorageGet("eatableIdChecked") === true){
                eatableRdbRef.current.checked = true;
                eatableSelRef.current.disabled = false;
            }
            if (localStorageGet("eatableIdQqChecked") === true){
                eatableRdbQqRef.current.checked = true;
                eatableSelRef.current.disabled = true;
            }
            else {
                eatableRdbRef.current.checked = true;
            }

            var sendEatableId = 0;
            if (eatableRdbRef.current.checked)
                sendEatableId = localStorageGet("eatableId");
            inventoryGetByEatable(sendEatableId);
            
        }
            
    }, [localStorageGet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {          
        if (unauthorizedItem || unauthorizedUnits){
            navigate("/login");
        }    
    }, [unauthorizedItem, unauthorizedUnits]); // eslint-disable-line react-hooks/exhaustive-deps

    //func
    function GetInventoryItemName(id){
        return inventoryItems.filter(u => u.id === id)[0].name;
    }

    function GetInventoryItemBrand(id){
        return inventoryItems.filter(u => u.id === id)[0].brand;
    }

    function GetInventoryItemContent(id){
        var inventoryItem = inventoryItems.filter(i => i.id === id)[0];
        var unit = units.filter(u => u.id === inventoryItem.unityId)[0];
        return inventoryItem.content + ' ' + unit.name;
    }

    async function  handleSubmit(e){
        e.preventDefault();
        setTimeout(() => {
            setShowWaiting(true);
            setRefreshing(true);
        }, 1000);        

        var sendEatableId = 0;
        if (eatableRdbRef.current.checked)
            sendEatableId = eatableId

        await inventoryGetByEatable(sendEatableId);
        setRefreshing(false);
        localStorageSet("eatableId", eatableId);
        localStorageSet("eatableIdChecked", eatableRdbRef.current.checked);
        localStorageSet("eatableIdQqChecked", eatableRdbQqRef.current.checked);
    }

    return (
        <div>

            <h1 className='h1-list'>
                Estoques
            </h1>        

            <form className="form-list" onSubmit={handleSubmit}>
                
                <div className="main-filter">

                    <div className="left-filter">
                        
                        <label>
                            <input type="radio" 
                                   ref={eatableRdbRef}                                       
                                   className="input-list"
                                   onChange={(e) => {
                                                        eatableSelRef.current.disabled = false;
                                                     }}                        
                                   id="type" 
                                   name="type" 
                                   value="1"  />
                            Comestivel
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
                                   onChange={(e) => {
                                                    eatableSelRef.current.disabled = true;
                                                 }}                        
                                   id="type" 
                                   name="type" 
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

            {(!items && (!error || refreshing) && showWaiting) && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }            
            {!items && error && !refreshing && 
                <p className='error-message-list'>{error}</p>
            }

            {(!inventoryItems && (!errorInventoryItems || refreshing) && showWaitingInventoryItems) && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {!inventoryItems && errorInventoryItems && !refreshing &&  
                <p className='error-message-list'>{errorInventoryItems}</p>
            }

            {(!units && (!errorUnits || refreshing) && showWaitingUnits) && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {!units && errorUnits && !refreshing &&  
                <p className='error-message-list'>{errorUnits}</p>
            }

            {(!eatables && (!errorEatables || refreshing) && showWaitingEatables) && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {!eatables && errorEatables && !refreshing &&  
                <p className='error-message-list'>{errorEatables}</p>
            }
                
            {(items && inventoryItems && units) && 
                <div className='card-container'>            
                    {items.map((item) => (
                        <div className='card' key={item.id}>
                            <div>
                                {GetInventoryItemName(item.inventoryItemId)}
                            </div>  
                            <div>
                                {GetInventoryItemBrand(item.inventoryItemId)}
                            </div> 
                            <div>
                                {GetInventoryItemContent(item.inventoryItemId)}
                            </div>                    
                            <div>
                                {item.quantity}
                            </div>
                            <div>
                                <Link to={`/Inventories/Edit/${item.id}`}>
                                    <button className='button-edit-list'>
                                        <AiFillEdit />
                                    </button>                       
                                </Link>                                                                                                                                  
                            </div>                    
                        </div>                    
                    ))}
                </div>
            }
        </div>
    )
}

export default InventoryList