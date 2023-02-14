//form component
import PurchaseOrders from './PurchaseOrders';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchPurchaseOrders } from "../../hooks/useFetchPurchaseOrders";

const PurchaseOrdersNew = () => {
  
  //data
  const { purchaseOrdersAdd } = useFetchPurchaseOrders();

  //init
  const item = {
    id: 0,
    providerId : 1,
    observation : '',
    total : 0,
    state: 1,
    payment: 1,
    purchaseOrderInventoryItems: []
  } 

  const navigate = useNavigate();

  const configure = {
      disableInputs: false,
      showState: false
  }
  
  //func
  const handlePersistence = async (data) => {
      await purchaseOrdersAdd(data);
      navigate("/PurchaseOrders");        
  }

  return(
      <div>
          <h1 className='h1-edit'>Novo pedido de compra</h1>
          <PurchaseOrders handlePersistence={handlePersistence} 
                          item={item}  
                          configure={configure} >                            
          </PurchaseOrders>
      </div>
  );

};

export default PurchaseOrdersNew;