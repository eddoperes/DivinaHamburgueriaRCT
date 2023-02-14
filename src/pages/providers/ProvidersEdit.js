//form component
import Providers from './Providers';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const ProvidersEdit = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            providersGetById, 
            providersEdit } = useFetchProviders();

    //init
    useEffect(() => {      
        providersGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }

    //func
    const handlePersistence = async (data) => {
        data.id = id;     
        await providersEdit(id, data);
        navigate("/Providers");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar cliente</h1>
            {showWaiting && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting &&
                <p className='error-message-edit'>{errorItem}</p>
            }
            {item && !showWaiting &&
                <Providers handlePersistence={handlePersistence} 
                           item={item} 
                           configure={configure}>                                
                </Providers>
            }
        </div>
    );

};

export default ProvidersEdit;