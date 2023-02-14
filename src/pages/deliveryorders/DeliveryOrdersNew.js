//form component
import DeliveryOrders from './DeliveryOrders';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchDeliveryOrders } from "../../hooks/useFetchDeliveryOrders";

const DeliveryOrdersNew = () => {
  
  //data
  const { deliveryOrdersAdd } = useFetchDeliveryOrders();

  //init
  const item = {
    id:0,
    customerId:1,
    observation:'',
    total:'',
    state:1,
    payment:1,
    deliveryOrderMenuItems:[]
  }

  const navigate = useNavigate();

  const configure = {
      disableInputs: false,
      showState: false
  }
  
  //func
  const handlePersistence = async (data) => {
      await deliveryOrdersAdd(data);
      navigate("/DeliveryOrders");        
  }

  return(
      <div>
          <h1 className='h1-edit'>Novo pedido delivery</h1>
          <DeliveryOrders handlePersistence={handlePersistence} 
                          item={item}  
                          configure={configure} >                            
          </DeliveryOrders>
      </div>
  );

};

export default DeliveryOrdersNew;