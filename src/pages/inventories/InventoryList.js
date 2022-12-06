//react hooks
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchUnits } from "../../hooks/useFetchUnits";
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";
import { useFetchInventories } from "../../hooks/useFetchInventories";

//icons
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';

const InventoryList = () => {

    //state
    const [eatable, setEatable] = useState('1');
    const [showWaiting, setShowWaiting] = useState(false);
    const [showWaitingUnits, setShowWaitingUnits] = useState(false);
    const [showWaitingInventoryItems, setShowWaitingInventoryItems] = useState(false);
    const [showWaitingEatables, setShowWaitingEatables] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //ref
    const eatableSelRef = useRef(null);
    const eatableRdbRef = useRef(null);

    //data
    const { data: units, error: errorUnits, unitsGetAll} = useFetchUnits();    
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
    const {data: items, error, inventoryGetAll} = useFetchInventories();

    //init
    useEffect(() => {   
        if (eatableRdbRef.current !== null)          
            eatableRdbRef.current.checked = true;
    }, [eatables]);

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
        await inventoryGetAll();
        setRefreshing(false);
    }

    return (
        <div>

            <h1 className='h1-list'>
                Estoques
            </h1>        

            <form className="form-list" onSubmit={handleSubmit}>
                
                {eatables &&

                <div className="main-filter">

                    <div className="left-filter">
                        
                        <label>
                            <input type="radio" 
                                    ref={eatableRdbRef}                                       
                                    className="input-list"
                                    onChange={(e) => {
                                                        setEatable(e.target.value);
                                                        eatableSelRef.current.disabled = false;
                                                    }}                        
                                    id="type" 
                                    name="type" 
                                    value="1"  />
                            Comestivel
                        </label>
                        <select value={eatable}
                                ref={eatableSelRef}
                                className="select-list"
                                onChange={(e) => setEatable(e.target.value)}                
                        >
                               {eatables.map((eatable) => (
                                    <option key={eatable.id} value={eatable.id}>
                                        {eatable.name}
                                    </option>                   
                                ))}                  
                        </select>              

                    </div>

                    <div className="right-filter">
                        <label>
                            <input type="radio" 
                                className="input-list"
                                onChange={(e) => {
                                                    setEatable(e.target.value);
                                                    eatableSelRef.current.disabled = true;
                                                }}                        
                                id="type" 
                                name="type" 
                                value=""  />
                            Qualquer
                        </label>
                    </div>

                </div>
                }

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
                
            {(items && inventoryItems && units) && <div className='card-container'>            
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
            </div>}

        </div>
        )
    }

export default InventoryList