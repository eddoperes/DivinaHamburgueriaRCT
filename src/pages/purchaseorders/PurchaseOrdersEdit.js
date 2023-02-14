//form component
import PurchaseOrders from './PurchaseOrders';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchPurchaseOrders } from "../../hooks/useFetchPurchaseOrders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const PurchaseOrdersEdit = () => {

    //data
    const { id } = useParams();
    const { data: item,
            error: errorItem, 
            waiting: showWaiting,
            purchaseOrdersEdit,
            purchaseOrdersGetById } = useFetchPurchaseOrders();

    //init
    useEffect(() => {      
        purchaseOrdersGetById(id);
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

        //await purchaseOrdersPatch(id, data);
        await purchaseOrdersEdit(id, data);
        navigate("/PurchaseOrders");
    }

    return (
        <div>
            <h1 className='h1-edit'>Editar ordem de compra</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <PurchaseOrders handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </PurchaseOrders>
            }
        </div>
    )

}

export default PurchaseOrdersEdit