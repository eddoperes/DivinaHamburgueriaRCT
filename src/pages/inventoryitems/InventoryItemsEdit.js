//form component
import InventoryItems from './InventoryItems';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const InventoryItemsEdit = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            inventoryItemsGetById, 
            inventoryItemsEdit } = useFetchInventoryItems();

    //init
    useEffect(() => {      
        inventoryItemsGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }    

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await inventoryItemsEdit(id, data);
        navigate("/InventoryItems");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar item do estoque</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <InventoryItems handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </InventoryItems>
            }
        </div>
    );

};

export default InventoryItemsEdit;