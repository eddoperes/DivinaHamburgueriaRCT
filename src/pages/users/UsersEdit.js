//form component
import Users from './Users';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchUsers } from "../../hooks/useFetchUsers";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const UsersEdit = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            usersGetById, 
            usersEdit } = useFetchUsers();

    //init
    useEffect(() => {      
        usersGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
        showPassword: false,
    }

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await usersEdit(id, data);
        navigate("/Users");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar usuário</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <Users handlePersistence={handlePersistence} 
                       item={item} 
                       configure={configure}>                                
                </Users>
            }
        </div>
    );

};

export default UsersEdit;