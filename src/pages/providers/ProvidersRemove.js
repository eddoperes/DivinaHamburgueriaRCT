//form component
import Providers from './Providers';

//react hooks
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const ProvidersRemove = () => {

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            waiting: showWaiting,
            providersGetById, 
            providersRemove } = useFetchProviders();

    //init
    useEffect(() => {      
        providersGetById(id);
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    const navigate = useNavigate();

    const configure = {
        disableInputs: true,
    }

    //func
    const handlePersistence = async (data) => {        
        data.id = id;     
        await providersRemove(id, data);
        navigate("/Providers");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover cliente</h1>
            {showWaiting && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && !showWaiting && 
                <p className='error-message'>{errorItem}</p>
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

export default ProvidersRemove;