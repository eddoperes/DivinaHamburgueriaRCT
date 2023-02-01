//form component
import Alarms from './Alarms';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchAlarms } from "../../hooks/useFetchAlarms";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const AlarmsRemove = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            alarmsGetById, 
            alarmsRemove } = useFetchAlarms();
    if (item === null) {alarmsGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
    }
    
    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await alarmsRemove(id, data);
        navigate("/Alarms");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover item do estoque</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message'>{errorItem}</p>
            }
            {item &&
                <Alarms handlePersistence={handlePersistence} 
                                item={item} 
                                configure={configure}>                                
                </Alarms>
            }
        </div>
    );

};

export default AlarmsRemove;