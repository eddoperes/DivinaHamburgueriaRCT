//form component
import Menus from './Menus';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenus } from "../../hooks/useFetchMenus";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenusRemove = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            menusGetById, 
            menusRemove } = useFetchMenus();

    //init
    useEffect(() => {      
        menusGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
    }

    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await menusRemove(id, data);
        navigate("/Menus");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover item do estoque</h1>
            {showWaiting && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message'>{errorItem}</p>
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

export default MenusRemove;