//form component
import DeliveryOrders from './DeliveryOrders';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchDeliveryOrders } from "../../hooks/useFetchDeliveryOrders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const DeliveryOrdersEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item,
            error: errorItem, 
            deliveryOrdersEdit,
            deliveryOrdersGetById } = useFetchDeliveryOrders();
    if (item === null) {deliveryOrdersGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
        showState: true
    }

    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

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
            <h1 className='h1-edit'>Editar pedido salão</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item &&
                <DeliveryOrders handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </DeliveryOrders>
            }
        </div>
    )

}

export default DeliveryOrdersEdit