//form component
import HallOrders from './HallOrders';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchHallOrders } from "../../hooks/useFetchHallOrders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const HallOrdersEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item,
            error: errorItem, 
            hallOrdersEdit,
            hallOrdersGetById } = useFetchHallOrders();
    if (item === null) {hallOrdersGetById(id)};

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

        //await hallOrdersPatch(id, data);
        await hallOrdersEdit(id, data);
        navigate("/HallOrders");
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
                <HallOrders handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </HallOrders>
            }
        </div>
    )

}

export default HallOrdersEdit