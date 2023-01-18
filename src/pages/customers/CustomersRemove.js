//form component
import Customers from './Customers';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const CustomersRemove = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            customersGetById, 
            customersRemove } = useFetchCustomers();
    if (item === null) {customersGetById(id)};

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
        await customersRemove(id, data);
        navigate("/Customers");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover cliente</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message'>{errorItem}</p>
            }
            {item &&
                <Customers handlePersistence={handlePersistence} 
                           item={item} 
                           configure={configure}>                                
                </Customers>
            }
        </div>
    );

};

export default CustomersRemove;