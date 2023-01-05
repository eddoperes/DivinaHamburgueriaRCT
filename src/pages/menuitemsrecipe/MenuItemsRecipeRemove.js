//form component
import MenuItemsRecipe from './MenuItemsRecipe';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsRecipeRemove = () => {

  //state
  const [showWaiting, setShowWaiting] = useState(false);

  //data
  const { id } = useParams();
  const { data: item,
          error: errorItem,           
          menuItemsRecipeRemove,
          menuItemsRecipeGetById } = useFetchMenuItemsRecipe();
  if (item === null) {menuItemsRecipeGetById(id)};

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
    await menuItemsRecipeRemove(id, data);
    navigate("/MenuItemsRecipe");
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
            <MenuItemsRecipe handlePersistence={handlePersistence} 
                             item={item} 
                             configure={configure}>                                
            </MenuItemsRecipe>
        }
    </div>
  )
}

export default MenuItemsRecipeRemove