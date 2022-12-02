//form component
import InventoryItems from './InventoryItems';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const InventoryItemsRemove = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            inventoryItemsGetById, 
            inventoryItemsRemove } = useFetchInventoryItems();
    if (item === null) {inventoryItemsGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
    }
    
    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await inventoryItemsRemove(id, data);
        navigate("/InventoryItems");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover item do estoque</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message'>{errorItem}</p>
            }
            {item &&
                <InventoryItems handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </InventoryItems>
            }
        </div>
    );

};

export default InventoryItemsRemove;