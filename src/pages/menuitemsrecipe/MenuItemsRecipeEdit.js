//form component
import MenuItemsRecipe from './MenuItemsRecipe';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsRecipeEdit = () => {

  //state
  const [showWaiting, setShowWaiting] = useState(false);

  //data
  const { id } = useParams();
  const { data: item,
          error: errorItem,           
          menuItemsRecipeEdit,
          menuItemsRecipeGetById } = useFetchMenuItemsRecipe();
  if (item === null) {menuItemsRecipeGetById(id)};

  //init
  const navigate = useNavigate();

  const configure = {
        disableInputs: false,
        showState: true
  }

  setTimeout(() => {
    setShowWaiting(true);
  }, 1000);

  //func
  const handlePersistence = async (data) => {
    data.id = id;     
    await menuItemsRecipeEdit(id, data);
    navigate("/MenuItemsRecipe");
  }

  return (
    <div>
        <h1 className='h1-edit'>Editar item do cardápio receita</h1>
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

export default MenuItemsRecipeEdit