//form component
import Inventory from './Inventory';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchInventories } from "../../hooks/useFetchInventories";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const InventoryEdit = () => {

  //state
  const [showWaiting, setShowWaiting] = useState(false);

  //data
  const { id } = useParams();
  const { data: item, 
          error: errorItem, 
          inventoryGetById, 
          inventoryEdit } = useFetchInventories();
  if (item === null) {inventoryGetById(id)};

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
    await inventoryEdit(id, data);
    navigate("/Inventories");
  }

  return (
    <div>
      <h1 className='h1-edit'>Editar estoque</h1>
      {(!item && !errorItem && showWaiting) && 
          <p className='waiting-icon-edit'><BsHourglassSplit/></p>
      } 
      {errorItem && 
          <p className='error-message-edit'>{errorItem}</p>
      }
      {item &&
        <Inventory handlePersistence={handlePersistence} 
                  item={item} 
                  configure={configure}>                    
        </Inventory> 
      }
    </div>
  )
}

export default InventoryEdit