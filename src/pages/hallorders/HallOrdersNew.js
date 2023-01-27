//form component
import HallOrders from './HallOrders';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchHallOrders } from "../../hooks/useFetchHallOrders";

const HallOrdersNew = () => {
  
  //data
  const { hallOrdersAdd } = useFetchHallOrders();

  //init
  const navigate = useNavigate();

  const configure = {
      disableInputs: false,
      showState: false
  }
  
  //func
  const handlePersistence = async (data) => {
      await hallOrdersAdd(data);
      navigate("/HallOrders");        
  }

  return(
      <div>
          <h1 className='h1-edit'>Novo pedido salão</h1>
          <HallOrders handlePersistence={handlePersistence} 
                      configure={configure} >                            
          </HallOrders>
      </div>
  );

};

export default HallOrdersNew;