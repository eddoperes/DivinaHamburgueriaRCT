//form component
import Customers from './Customers';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const CustomersEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            customersGetById, 
            customersEdit } = useFetchCustomers();
    if (item === null) {customersGetById(id)};

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
        await customersEdit(id, data);
        navigate("/Customers");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar cliente</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
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

export default CustomersEdit;