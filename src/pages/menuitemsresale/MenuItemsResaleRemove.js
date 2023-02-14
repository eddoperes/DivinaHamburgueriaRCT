//form component
import MenuItemsResale from './MenuItemsResale';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsResaleRemove = () => {

  //data
  const { id } = useParams();
  const { data: item,
          error: errorItem,     
          waiting: showWaiting,      
          menuItemsResaleRemove,
          menuItemsResaleGetById } = useFetchMenuItemsResale();

  //init
  useEffect(() => {      
    menuItemsResaleGetById(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  const configure = {
        disableInputs: true
  }

  //func
  const handlePersistence = async (data) => {
    data.id = id;     
    await menuItemsResaleRemove(id, data);
    navigate("/MenuItemsResale");
  }


  return (
    <div>
        <h1 className='h1-edit'>Remover item do cardápio receita</h1>
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

export default MenuItemsResaleRemove