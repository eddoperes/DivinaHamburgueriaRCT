//form component
import Menus from './Menus';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenus } from "../../hooks/useFetchMenus";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenusEdit = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            menusGetById, 
            menusEdit } = useFetchMenus();

    //init
    useEffect(() => {      
        menusGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps   

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await menusEdit(id, data);
        navigate("/Menus");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar cardápio</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <Menus handlePersistence={handlePersistence} 
                       item={item} 
                       configure={configure}>                                
                </Menus>
            }
        </div>
    );

};

export default MenusEdit;