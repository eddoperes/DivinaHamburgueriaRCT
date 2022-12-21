//form component
import PurchaseOrders from './PurchaseOrders';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchPurchaseOrders } from "../../hooks/useFetchPurchaseOrders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const PurchaseOrdersEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item,
            error: errorItem, 
            purchaseOrdersPatch,
            purchaseOrdersEdit,
            purchaseOrdersGetById } = useFetchPurchaseOrders();
    if (item === null) {purchaseOrdersGetById(id)};

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

        //await purchaseOrdersPatch(id, data);
        await purchaseOrdersEdit(id, data);
        navigate("/PurchaseOrders");
    }

    return (
        <div>
            <h1 className='h1-edit'>Editar ordem de compra</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item &&
                <PurchaseOrders handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </PurchaseOrders>
            }
        </div>
    )

}

export default PurchaseOrdersEdit