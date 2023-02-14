//form component
import Users from './Users';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchUsers } from "../../hooks/useFetchUsers";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const UsersRemove = () => {

    //state
    //const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            usersGetById, 
            usersRemove } = useFetchUsers();
    //if (item === null) {usersGetById(id)};

    //init
    useEffect(() => {      
        usersGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
        showPassword: false
    }
    
    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await usersRemove(id, data);
        navigate("/Users");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover usuário</h1>
            {showWaiting && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message'>{errorItem}</p>
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

export default UsersRemove;