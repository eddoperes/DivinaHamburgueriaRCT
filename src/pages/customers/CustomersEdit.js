//form component
import Customers from './Customers';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchCustomers } from "../../hooks/useFetchCustomers";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const CustomersEdit = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            customersGetById, 
            customersEdit } = useFetchCustomers();

    //init
    useEffect(() => {      
        customersGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await customersEdit(id, data);
        navigate("/Customers");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar cliente</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <Customers handlePersistence={handlePersistence} 
                           item={item} 
                           configure={configure}>                                
                </Customers>
            }
        </div>
    );

};

export default CustomersEdit;