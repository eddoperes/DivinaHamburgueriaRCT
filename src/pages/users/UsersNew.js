//form component
import Users from './Users';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchUsers } from "../../hooks/useFetchUsers";

const UsersNew = () => {
    
     //data
    const { usersAdd } = useFetchUsers();

    //init
    const item = {
        id: 0,
        name : '',
        type: 1,
        state : 1,
        email : '',  
        password : '',      
    } 

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
        showPassword: true,
    }
          
    //func
    const handlePersistence = async (data) => {
        await usersAdd(data);
        navigate("/Users");        
    }

    return(
        <div>
            <h1 className='h1-edit'>Novo usuário</h1>
            <Users handlePersistence={handlePersistence} 
                   item={item} 
                   configure={configure} >                            
            </Users>
        </div>
    );

};

export default UsersNew;