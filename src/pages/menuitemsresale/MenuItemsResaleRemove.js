//form component
import MenuItemsResale from './MenuItemsResale';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsResaleRemove = () => {

  //state
  const [showWaiting, setShowWaiting] = useState(false);

  //data
  const { id } = useParams();
  const { data: item,
          error: errorItem,           
          menuItemsResaleRemove,
          menuItemsResaleGetById } = useFetchMenuItemsResale();
  if (item === null) {menuItemsResaleGetById(id)};

  //init
  const navigate = useNavigate();

  const configure = {
        disableInputs: true
  }

  setTimeout(() => {
    setShowWaiting(true);
  }, 1000);

  //func
  const handlePersistence = async (data) => {
    data.id = id;     
    await menuItemsResaleRemove(id, data);
    navigate("/MenuItemsResale");
  }


  return (
    <div>
        <h1 className='h1-edit'>Remover item do cardápio receita</h1>
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

export default MenuItemsResaleRemove