//form component
import Inventory from './Inventory';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchInventories } from "../../hooks/useFetchInventories";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const InventoryEdit = () => {

  //data
  const { id } = useParams();
  const { data: item, 
          error: errorItem, 
          waiting: showWaiting,
          inventoryGetById, 
          inventoryEdit } = useFetchInventories();

  //init
  useEffect(() => {      
    inventoryGetById(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  const configure = {
    disableInputs: false,
  }

  //func
  const handlePersistence = async (data) => {
    data.id = id;     
    await inventoryEdit(id, data);
    navigate("/Inventories");
  }

  return (
    <div>
      <h1 className='h1-edit'>Editar estoque</h1>
      {showWaiting && 
          <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      } 
      {errorItem && !showWaiting &&
          <p className='error-message-edit'>{errorItem}</p>
      }
      {item && !showWaiting &&
        <Inventory handlePersistence={handlePersistence} 
                  item={item} 
                  configure={configure}>                    
        </Inventory> 
      }
    </div>
  )
}

export default InventoryEdit