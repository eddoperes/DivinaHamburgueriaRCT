//form component
import Customers from './Customers';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";

const CustomersNew = () => {
    
     //data
    const { customersAdd } = useFetchCustomers();

    //init
    const item = {
        id:0,
        name:'',
        cpf:''
    }

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }
          
    //func
    const handlePersistence = async (data) => {
        await customersAdd(data);
        navigate("/customers");        
    }

    return(
        <div>
            <h1 className='h1-edit'>Novo cliente</h1>
            <Customers handlePersistence={handlePersistence} 
                       item={item} 
                       configure={configure} >                            
            </Customers>
        </div>
    );

};

export default CustomersNew;