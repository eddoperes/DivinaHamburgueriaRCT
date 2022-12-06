//react hooks
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

//data hooks
import { useFetchUnits } from "../../hooks/useFetchUnits";
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const InventoryItemsList = () => {

    //state
    const [name, setName] = useState('');
    const [type, setType] = useState('1');
    const [showWaiting, setShowWaiting] = useState(false);
    const [showWaitingUnits, setShowWaitingUnits] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //ref
    const nameTxtRef = useRef(null);
    const nameRdbRef = useRef(null);
    const typeSelRef = useRef(null);
    const typeRdbRef = useRef(null);

    //data
    const { data: units, error: errorUnits, unitsGetAll} = useFetchUnits();    
    if (units === null) {
        setTimeout(() => {
            setShowWaitingUnits(true);
        }, 1000);
        unitsGetAll();        
    }
    const {data: items, error, inventoryItemsGetByNameAndOrType} = useFetchInventoryItems();

    //init
    useEffect(() => {   
        if (nameRdbRef.current !== null &&
            typeRdbRef.current !== null){

                nameRdbRef.current.checked = true;
                typeRdbRef.current.checked = true;

        }    
    }, [units]);

    //func
    function GetUnitName(id){
        return units.filter(u => u.id === id)[0].name;
    }

    function GetTypeName(type){
        if (type===1)
            return "Receita";
        else if (type===2)
            return "Revenda";
        else
            return "";
    }

    async function  handleSubmit(e){
        e.preventDefault();
        setTimeout(() => {
            setShowWaiting(true);
            setRefreshing(true);
        }, 1000);        
        await inventoryItemsGetByNameAndOrType(name, type);
        setRefreshing(false);
    }

    return(
        <div>

            <h1 className='h1-list'>
                Itens do estoque
            </h1>        
       
            <form className="form-list" onSubmit={handleSubmit}>
              
                <div className="main-filter">

                    <div className="left-filter">

                        <label>
                            <input type="radio"  
                                   ref={nameRdbRef}                                   
                                   className="input-list"
                                   onChange={(e) => {
                                                        setName(e.target.value);
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
                        />
                    </div>

                    <div className="right-filter">
                        <label>
                            <input type="radio" 
                                className="input-list"
                                onChange={(e) => {
                                                    setName(e.target.value);
                                                    nameTxtRef.current.disabled = true;
                                                 }}                       
                                id="name" 
                                name="name" 
                                value=""  />
                            Qualquer
                        </label>
                    </div>

                </div>

                <div className="main-filter">

                    <div className="left-filter">
                        
                        <label>
                            <input type="radio" 
                                   ref={typeRdbRef}                                       
                                   className="input-list"
                                   onChange={(e) => {
                                                        setType(e.target.value);
                                                        typeSelRef.current.disabled = false;
                                                    }}                        
                                    id="type" 
                                    name="type" 
                                    value="1"  />
                            Tipo
                        </label>
                        <select value={type}
                                ref={typeSelRef}
                                className="select-list"
                                onChange={(e) => setType(e.target.value)}                
                        >
                                <option value="1">
                                    Receita
                                </option>  
                                <option value="2">
                                    Revenda
                                </option>                  
                        </select>              

                    </div>

                    <div className="right-filter">
                        <label>
                            <input type="radio" 
                                className="input-list"
                                onChange={(e) => {
                                                    setType(e.target.value);
                                                    typeSelRef.current.disabled = true;
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

            <div className='button-new-list-container'>
                <Link to={'/InventoryItems/New'}>
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
            {(!units && (!errorUnits || refreshing) && showWaitingUnits) && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }  
            {!units && errorUnits && !refreshing &&  
                <p className='error-message-list'>{errorUnits}</p>
            }
                
            {(items && units) && <div className='card-container'>
               {items.map((item) => (
                    <div className='card' key={item.id}>
                        <div>
                            {item.name}
                        </div>                        
                        <div>
                            {item.brand}
                        </div>
                        <div>
                            {item.content} {GetUnitName(item.unityId)}                                                       
                        </div>   
                        <div>
                            {GetTypeName(item.type)}
                        </div> 
                        <div>
                            <Link to={`/InventoryItems/Edit/${item.id}`}>
                                <button className='button-edit-list'>
                                    <AiFillEdit />
                                </button>                       
                            </Link>                                                    
                            <Link to={`/InventoryItems/Remove/${item.id}`}>
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

};

export default InventoryItemsList;