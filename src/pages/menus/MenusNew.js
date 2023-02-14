//form component
import Menus from './Menus';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenus } from "../../hooks/useFetchMenus";

const MenusNew = () => {

  //data
  const { menusAdd } = useFetchMenus();

  //init
  const item = {
    id: 0,
    name : '',
    description : '',
    state : 0,
    menuMenuItems: []
  } 

  const navigate = useNavigate();

  const configure = {
      disableInputs: false,
  }
        
  //func
  const handlePersistence = async (data) => {      
      await menusAdd(data);
      navigate("/Menus");        
  }

  return (
    <div>
      <h1 className='h1-edit'>Novo cardápio</h1>
      <Menus handlePersistence={handlePersistence} 
             item={item} 
             configure={configure} >                            
      </Menus>
    </div>
  )
  
}

export default MenusNew