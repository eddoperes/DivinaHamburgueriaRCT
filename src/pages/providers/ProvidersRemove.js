//form component
import Providers from './Providers';

//react hooks
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const ProvidersRemove = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            providersGetById, 
            providersRemove } = useFetchProviders();
    if (item === null) {providersGetById(id)};

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
        await providersRemove(id, data);
        navigate("/Providers");
    }

    return(
        <div>
            <h1 className='h1-edit'>Remover cliente</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message'>{errorItem}</p>
            }
            {item &&
                <Providers handlePersistence={handlePersistence} 
                           item={item} 
                           configure={configure}>                                
                </Providers>
            }
        </div>
    );

};

export default ProvidersRemove;