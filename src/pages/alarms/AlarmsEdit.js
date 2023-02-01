//form component
import Alarms from './Alarms';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchAlarms } from "../../hooks/useFetchAlarms";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const AlarmsEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            alarmsGetById, 
            alarmsEdit } = useFetchAlarms();
    if (item === null) {alarmsGetById(id)};

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }

    setTimeout(() => {
        setShowWaiting(true);
    }, 1000);

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await alarmsEdit(id, data);
        navigate("/Alarms");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar alarme</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
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

export default AlarmsEdit;