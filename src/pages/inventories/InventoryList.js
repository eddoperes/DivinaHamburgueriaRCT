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

    //ref
    const eatableSelRef = useRef(null);
    const eatableRdbRef = useRef(null);
    const eatableRdbQqRef = useRef(null);

    //data
    const { data: units, error: errorUnits, unitsGetAll, unauthorized: unauthorizedUnits, waiting: showWaitingUnits} = useFetchUnits();    
    const { data: inventoryItems, error: errorInventoryItems, waiting: showWaitingInventoryItems, inventoryItemsGetAll} = useFetchInventoryItems();    
    if (inventoryItems === null) {
        inventoryItemsGetAll();        
    }
    const { data: eatables, error: errorEatables, inventoryItemsGetDistinctNames, waiting: showWaitingEatables} = useFetchInventoryItems();    
    if (eatables === null) {
        inventoryItemsGetDistinctNames();        
    }
    const {data: items, error, inventoryGetByEatable, unauthorized: unauthorizedItem, waiting: showWaiting} = useFetchInventories();
    const {set: localStorageSet , get: localStorageGet} = useFetchLocalStorage();

    //init
    const navigate = useNavigate();

    useEffect(() => {          

        unitsGetAll();

        if(localStorageGet("eatableIdChecked") === "" &&
            localStorageGet("eatableIdQqChecked") === "")
            {
                localStorageSet("eatableIdQqChecked", true);
                eatableRdbQqRef.current.checked = true;
                eatableSelRef.current.disabled = true;                 
                return;
            }     

        setEatableId(localStorageGet("eatableId"));
        if (localStorageGet("eatableIdChecked") === true){
            eatableRdbRef.current.checked = true;
            eatableSelRef.current.disabled = false;
        }
        if (localStorageGet("eatableIdQqChecked") === true){
            eatableRdbQqRef.current.checked = true;
            eatableSelRef.current.disabled = true;
        }

        var sendEatableId = 0;
        if (eatableRdbRef.current.checked)
            sendEatableId = localStorageGet("eatableId");
        inventoryGetByEatable(sendEatableId);
                        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        if (inventoryItem === null || inventoryItem === undefined)
            return "";
        var unit = units.filter(u => u.id === inventoryItem.unityId)[0];
        return inventoryItem.content + ' ' + unit.name;
    }

    async function  handleSubmit(e){
        e.preventDefault();        

        var sendEatableId = 0;
        if (eatableRdbRef.current.checked)
            sendEatableId = eatableId

        await inventoryGetByEatable(sendEatableId);

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

            {showWaiting && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }            
            {error && !showWaiting && 
                <p className='error-message-list'>{error}</p>
            }

            {showWaitingInventoryItems && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {errorInventoryItems && !showWaitingInventoryItems &&  
                <p className='error-message-list'>{errorInventoryItems}</p>
            }

            {showWaitingUnits && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {errorUnits && !showWaitingUnits &&  
                <p className='error-message-list'>{errorUnits}</p>
            }

            {showWaitingEatables && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {errorEatables && !showWaitingEatables &&  
                <p className='error-message-list'>{errorEatables}</p>
            }
                
            {items && inventoryItems && units && 
             !showWaiting && !showWaitingInventoryItems &&  
             !showWaitingUnits && !showWaitingEatables &&  
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