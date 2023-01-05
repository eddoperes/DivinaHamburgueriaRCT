//form component
import MenuItemsRecipe from './MenuItemsRecipe';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenuItemsRecipe } from "../../hooks/useFetchMenuItemsRecipe";

const MenuItemsRecipeNew = () => {

  //data
  const { menuItemsRecipeAdd } = useFetchMenuItemsRecipe();

  //init
  const navigate = useNavigate();

  const configure = {
      disableInputs: false,
  }
        
  //func
  const handlePersistence = async (data) => {      
      await menuItemsRecipeAdd(data);
      navigate("/MenuItemsRecipe");        
  }

  return (
    <div>
      <h1 className='h1-edit'>Novo item do cardápio receita</h1>
      <MenuItemsRecipe handlePersistence={handlePersistence} 
                      configure={configure} >                            
      </MenuItemsRecipe>
    </div>
  )
  
}

export default MenuItemsRecipeNew