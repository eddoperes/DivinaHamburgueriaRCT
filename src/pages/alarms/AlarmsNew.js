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
                    configure={configure} >                            
            </Alarms>
        </div>
    );

};

export default AlarmsNew;