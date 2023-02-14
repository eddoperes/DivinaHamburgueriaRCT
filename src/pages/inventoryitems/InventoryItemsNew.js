//form component
import InventoryItems from './InventoryItems';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchInventoryItems } from "../../hooks/useFetchInventoryItems";

const InventoryItemsNew = () => {
    
     //data
    const { inventoryItemsAdd } = useFetchInventoryItems();

    //init
    const item = {
        id:0,
        name:'',
        brand:'',
        content:0,
        unityId:1,
        type:1
    }

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }
          
    //func
    const handlePersistence = async (data) => {
        await inventoryItemsAdd(data);
        navigate("/InventoryItems");        
    }

    return(
        <div>
            <h1 className='h1-edit'>Novo item do estoque</h1>
            <InventoryItems handlePersistence={handlePersistence} 
                            item={item}
                            configure={configure} >                            
            </InventoryItems>
        </div>
    );

};

export default InventoryItemsNew;