//form component
import Menus from './Menus';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchMenus } from "../../hooks/useFetchMenus";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const MenusEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            menusGetById, 
            menusEdit } = useFetchMenus();
    if (item === null) {menusGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }

    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await menusEdit(id, data);
        navigate("/Menus");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar cardápio</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
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

export default MenusEdit;