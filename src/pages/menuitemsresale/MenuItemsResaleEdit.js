//form component
import MenuItemsResale from './MenuItemsResale';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsResaleEdit = () => {

  //state
  const [showWaiting, setShowWaiting] = useState(false);

  //data
  const { id } = useParams();
  const { data: item,
          error: errorItem,           
          menuItemsResaleEdit,
          menuItemsResaleGetById } = useFetchMenuItemsResale();
  if (item === null) {menuItemsResaleGetById(id)};

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
    await menuItemsResaleEdit(id, data);
    navigate("/MenuItemsResale");
  }

  return (
    <div>
        <h1 className='h1-edit'>Editar item do cardápio revenda</h1>
        {(!item && !errorItem && showWaiting) && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        } 
        {errorItem && 
            <p className='error-message-edit'>{errorItem}</p>
        }
        {item &&
            <MenuItemsResale handlePersistence={handlePersistence} 
                            item={item} 
                            configure={configure}>                                
            </MenuItemsResale>
        }
    </div>
  )

}

export default MenuItemsResaleEdit