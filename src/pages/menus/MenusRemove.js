//form component
import Menus from './Menus';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchMenus } from "../../hooks/useFetchMenus";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenusRemove = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            menusGetById, 
            menusRemove } = useFetchMenus();
    if (item === null) {menusGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
    }
    
    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await menusRemove(id, data);
        navigate("/Menus");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover item do estoque</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message'>{errorItem}</p>
            }
            {item &&
                <Menus handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </Menus>
            }
        </div>
    );

};

export default MenusRemove;