//form component
import MenuItemsResale from './MenuItemsResale';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenuItemsResale } from "../../hooks/useFetchMenuItemsResale";

const MenuItemsResaleNew = () => {

  //data
  const { menuItemsResaleAdd } = useFetchMenuItemsResale();

  //init
  const navigate = useNavigate();

  const configure = {
      disableInputs: false,
  }
        
  //func
  const handlePersistence = async (data) => {      
      await menuItemsResaleAdd(data);
      navigate("/MenuItemsResale");        
  }

  return (
    <div>
      <h1 className='h1-edit'>Novo item do cardápio revenda</h1>
      <MenuItemsResale handlePersistence={handlePersistence} 
                      configure={configure} >                            
      </MenuItemsResale>
    </div>
  )
  
}

export default MenuItemsResaleNew