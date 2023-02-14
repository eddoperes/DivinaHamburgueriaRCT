//form component
import Alarms from './Alarms';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchAlarms } from "../../hooks/useFetchAlarms";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const AlarmsEdit = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            alarmsGetById, 
            alarmsEdit } = useFetchAlarms();

    //init
    useEffect(() => {      
        alarmsGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await alarmsEdit(id, data);
        navigate("/Alarms");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar alarme</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting && 
                <p className='error-message-edit'>{errorItem}</p>
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

export default AlarmsEdit;