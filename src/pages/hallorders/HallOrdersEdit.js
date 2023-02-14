//form component
import HallOrders from './HallOrders';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchHallOrders } from "../../hooks/useFetchHallOrders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const HallOrdersEdit = () => {

    //data
    const { id } = useParams();
    const { data: item,
            error: errorItem, 
            waiting: showWaiting,
            hallOrdersEdit,
            hallOrdersGetById } = useFetchHallOrders();

    //init
    useEffect(() => {      
        hallOrdersGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
        showState: true
    }

    //func
    const handlePersistence = async (data) => {
        data.id = id;     

        //console.log(data);

        //await hallOrdersPatch(id, data);
        await hallOrdersEdit(id, data);
        navigate("/HallOrders");
    }

    return (
        <div>
            <h1 className='h1-edit'>Editar pedido salão</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting && 
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <HallOrders handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </HallOrders>
            }
        </div>
    )

}

export default HallOrdersEdit