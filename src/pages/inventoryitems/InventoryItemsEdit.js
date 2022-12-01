//form component
import InventoryItems from './InventoryItems';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const InventoryItemsEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            inventoryItemsGetById, 
            inventoryItemsEdit } = useFetchInventoryItems();
    if (item === null) {inventoryItemsGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }

    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await inventoryItemsEdit(id, data);
        navigate("/InventoryItems");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar item do estoque</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
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

export default InventoryItemsEdit;