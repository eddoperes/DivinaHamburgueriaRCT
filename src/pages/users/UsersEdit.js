//form component
import Users from './Users';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchUsers } from "../../hooks/useFetchUsers";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const UsersEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            usersGetById, 
            usersEdit } = useFetchUsers();
    if (item === null) {usersGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
        showPassword: false,
    }

    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await usersEdit(id, data);
        navigate("/Users");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar usuário</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item &&
                <Users handlePersistence={handlePersistence} 
                           item={item} 
                           configure={configure}>                                
                </Users>
            }
        </div>
    );

};

export default UsersEdit;