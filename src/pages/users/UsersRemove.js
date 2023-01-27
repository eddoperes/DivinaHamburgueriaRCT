//form component
import Users from './Users';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchUsers } from "../../hooks/useFetchUsers";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const UsersRemove = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            usersGetById, 
            usersRemove } = useFetchUsers();
    if (item === null) {usersGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
        showPassword: false
    }
    
    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await usersRemove(id, data);
        navigate("/Users");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover usuário</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message'>{errorItem}</p>
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

export default UsersRemove;