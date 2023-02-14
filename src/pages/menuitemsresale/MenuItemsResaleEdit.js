//form component
import MenuItemsResale from './MenuItemsResale';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsResaleEdit = () => {

  //data
  const { id } = useParams();
  const { data: item,
          error: errorItem,   
          waiting: showWaiting,        
          menuItemsResaleEdit,
          menuItemsResaleGetById } = useFetchMenuItemsResale();

  //init
  useEffect(() => {      
    menuItemsResaleGetById(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  const configure = {
        disableInputs: false,    
  }

  //func
  const handlePersistence = async (data) => {
    data.id = id;     
    await menuItemsResaleEdit(id, data);
    navigate("/MenuItemsResale");
  }

  return (
    <div>
        <h1 className='h1-edit'>Editar item do cardápio revenda</h1>
        {showWaiting && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        } 
        {errorItem && !showWaiting &&
            <p className='error-message-edit'>{errorItem}</p>
        }
        {item && !showWaiting &&
            <MenuItemsResale handlePersistence={handlePersistence} 
                            item={item} 
                            configure={configure}>                                
            </MenuItemsResale>
        }
    </div>
  )

}

export default MenuItemsResaleEdit