//form component
import Alarms from './Alarms';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchAlarms } from "../../hooks/useFetchAlarms";

const AlarmsNew = () => {
    
     //data
    const { alarmsAdd } = useFetchAlarms();   

    //init
    const item = {
        id: 0,
        eatableId: 1,
        unityId: 1,
        minimumQuantity: 0,                
        validityInDays:0 
    }

    const navigate = useNavigate();   

    const configure = {
        disableInputs: false,
    }
          
    //func
    const handlePersistence = async (data) => {
        await alarmsAdd(data);
        navigate("/Alarms");        
    }

    return(
        <div>
            <h1 className='h1-edit'>Novo alarme</h1>
            <Alarms handlePersistence={handlePersistence} 
                    item = {item}
                    configure={configure} >                            
            </Alarms>
        </div>
    );

};

export default AlarmsNew;