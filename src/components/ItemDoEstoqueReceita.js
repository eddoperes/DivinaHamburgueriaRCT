import './ItemDoEstoqueReceita.css';
import { useFetchInventoryItems } from "../hooks/useFetchInventoryItems";
import { useFetchUnits } from "../hooks/useFetchUnits";
import {Link} from 'react-router-dom';

import { VscNewFile } from 'react-icons/vsc';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const ItemDoEstoqueReceita = () => {

    const {data: items, error, inventoryItemsGetAll} = useFetchInventoryItems();
    if (items === null) inventoryItemsGetAll();
    const { data: units, error: errorUnits, unitsGetAll} = useFetchUnits();    
    if (units === null) {unitsGetAll()};

    function GetTypeName(type){
        if (type===1)
            return "Receita"
        else if (type===2)
            return "Revenda"
        else
            return ""
    }

    return(
        <div>
            <h1>
                Itens do estoque
            </h1>            
            <Link to={'/ItensDoEstoqueReceita/New'}>
                <button className='button button-new'>
                    <VscNewFile/>
                </button>                
            </Link>                
            {error && <p>{error}</p>}
            {errorUnits && <p>{errorUnits}</p>}
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
                            {item.content} {units.filter(u => u.id === item.unityId)[0].name}                                                       
                        </div>   
                        <div>
                            {GetTypeName(item.type)}
                        </div> 
                        <div>
                            <Link to={`/ItensDoEstoqueReceita/Edit/${item.id}`}>
                                <button className='button button-edit'>
                                    <AiFillEdit />
                                </button>                       
                            </Link>                                                    
                            <Link to={`/ItensDoEstoqueReceita/Edit/${item.id}`}>
                                <button className='button button-delete'>
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

export default ItemDoEstoqueReceita;