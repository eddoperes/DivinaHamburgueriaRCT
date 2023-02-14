//react hooks
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

//data hooks
import { useFetchInventoryItems } from "../hooks/useFetchInventoryItems";
import { useFetchQuantityAlarmsTriggered } from "../hooks/useFetchQuantityAlarmTriggered";
import { useFetchValidityAlarmsTriggered } from "../hooks/useFetchValidityAlarmsTriggered";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const Home = () => {

  //data
  const { data: itemsQuantity, 
          error: errorQuantity, 
          quantityAlarmsTriggeredGetAll, 
          unauthorized: unauthorizedItemQuantity, 
          waiting: showWaitingQuantity} = useFetchQuantityAlarmsTriggered();

  const { data: itemsValidity, 
          error: errorValidity, 
          validityAlarmsTriggeredGetAll, 
          unauthorized: unauthorizedItemValidity, 
          waiting: showWaitingValidity} = useFetchValidityAlarmsTriggered();

  const { data: eatables, 
          error: errorEatable, 
          inventoryItemsGetDistinctNames, 
          unauthorized: unauthorizedEatable, 
          waiting: showWaitingEatable} = useFetchInventoryItems();

  //init
  const navigate = useNavigate();

  useEffect(() => {   

    inventoryItemsGetDistinctNames();
    quantityAlarmsTriggeredGetAll();
    validityAlarmsTriggeredGetAll();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {          
    if (unauthorizedItemQuantity || unauthorizedItemValidity || unauthorizedEatable){
        navigate("/login");
    }    
  }, [unauthorizedItemQuantity, unauthorizedItemValidity, unauthorizedEatable]); // eslint-disable-line react-hooks/exhaustive-deps

  //func
  function GetEatableName(id){
    return eatables.filter(e => e.id === id)[0].name;
  }

  return (

    <div>

      <h1 className='h1-list'>
          Home
      </h1>      

      {showWaitingEatable && 
          <p className='waiting-icon-list'><BsHourglassSplit/></p>
      }            
      {errorEatable && !showWaitingEatable && 
          <p className='error-message-list'>{errorEatable}</p>
      }  

      <div>
        <h2 className='h1-list'>
            Alarme de quantidade
        </h2>
      </div>

      {showWaitingQuantity && 
          <p className='waiting-icon-list'><BsHourglassSplit/></p>
      }            
      {errorQuantity && !showWaitingQuantity && 
          <p className='error-message-list'>{errorQuantity}</p>
      }

      {itemsQuantity && eatables &&
      !showWaitingQuantity && !showWaitingEatable &&            
        <div className='card-container'>
           
            {itemsQuantity.map((item) => (
                <div className='card' key={item.id}>
                    <div>
                      {GetEatableName(item.eatableId)}
                    </div>
                    <div>
                        Mínimo: {item.minimumQuantity}
                    </div>  
                    <div>
                        Verificado: {item.verifiedQuantity}
                    </div>                                                                                 
                </div>                    
            ))}
        </div>
      }

      <div>
        <h2 className='h1-list'>
            Alarme de validade
        </h2>
      </div>

      {showWaitingValidity && 
          <p className='waiting-icon-list'><BsHourglassSplit/></p>
      }            
      {errorValidity && !showWaitingValidity && 
          <p className='error-message-list'>{errorValidity}</p>
      }

      {itemsValidity && eatables &&
       !showWaitingValidity && !showWaitingEatable &&            
        <div className='card-container'>
           
            {itemsValidity.map((item) => (
                <div className='card' key={item.id}>
                    <div>
                      {GetEatableName(item.eatableId)}
                    </div>
                    <div>
                        Validade: {item.validityInDays}
                    </div>  
                    <div>
                        Estragado: {item.possiblySpoiled}
                    </div>                                                                                 
                </div>                    
            ))}
        </div>
      }

    </div>

  )
}

export default Home