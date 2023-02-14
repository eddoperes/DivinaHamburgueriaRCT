//form component
import MenuItemsRecipe from './MenuItemsRecipe';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenuItemsRecipeEdit = () => {

  //data
  const { id } = useParams();
  const { data: item,
          error: errorItem, 
          waiting: showWaiting,          
          menuItemsRecipeEdit,
          menuItemsRecipeGetById } = useFetchMenuItemsRecipe();

  //init
  useEffect(() => {      
    menuItemsRecipeGetById(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const navigate = useNavigate();

  const configure = {
        disableInputs: false,
        showState: true
  }

  //func
  const handlePersistence = async (data) => {
    data.id = id;     
    await menuItemsRecipeEdit(id, data);
    navigate("/MenuItemsRecipe");
  }

  return (
    <div>
        <h1 className='h1-edit'>Editar item do cardápio receita</h1>
        {showWaiting && 
            <p className='waiting-icon-edit'><BsHourglassSplit/></p>
        } 
        {errorItem && !showWaiting &&
            <p className='error-message-edit'>{errorItem}</p>
        }
        {item && !showWaiting &&
            <MenuItemsRecipe handlePersistence={handlePersistence} 
                            item={item} 
                            configure={configure}>                                
            </MenuItemsRecipe>
        }
    </div>
  )

}

export default MenuItemsRecipeEdit