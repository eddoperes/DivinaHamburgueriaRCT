//form component
import DeliveryOrders from './DeliveryOrders';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchDeliveryOrders } from "../../hooks/useFetchDeliveryOrders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const DeliveryOrdersEdit = () => {

    //data
    const { id } = useParams();
    const { data: item,
            error: errorItem, 
            waiting: showWaiting,
            deliveryOrdersEdit,
            deliveryOrdersGetById } = useFetchDeliveryOrders();

    //init
    useEffect(() => {      
        deliveryOrdersGetById(id);
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

        //await deliveryOrdersPatch(id, data);
        await deliveryOrdersEdit(id, data);
        navigate("/DeliveryOrders");
    }

    return (
        <div>
            <h1 className='h1-edit'>Editar pedido delivery</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <DeliveryOrders handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </DeliveryOrders>
            }
        </div>
    )

}

export default DeliveryOrdersEdit