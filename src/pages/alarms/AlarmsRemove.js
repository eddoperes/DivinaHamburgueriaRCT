//form component
import Alarms from './Alarms';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchAlarms } from "../../hooks/useFetchAlarms";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const AlarmsRemove = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            alarmsGetById, 
            alarmsRemove } = useFetchAlarms();
    
    //init
    useEffect(() => {      
        alarmsGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
    }

    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await alarmsRemove(id, data);
        navigate("/Alarms");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover item do estoque</h1>
            {showWaiting && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting && 
                <p className='error-message'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <Alarms handlePersistence={handlePersistence} 
                        item={item} 
                        configure={configure}>                                
                </Alarms>
            }
        </div>
    );

};

export default AlarmsRemove;