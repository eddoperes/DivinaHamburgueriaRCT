//form component
import Providers from './Providers';

//react hooks
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";

//icons
import { BsHourglassSplit } from 'react-icons/bs';

const ProvidersEdit = () => {

    //state
    const [showWaiting, setShowWaiting] = useState(false);

    //data
    const { id } = useParams();
    const { data: item, 
            error: errorItem, 
            providersGetById, 
            providersEdit } = useFetchProviders();
    if (item === null) {providersGetById(id)};

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
        await providersEdit(id, data);
        navigate("/Providers");
    }

    return(
        <div>
            <h1 className='h1-edit'>Editar cliente</h1>
            {(!item && !errorItem && showWaiting) && 
                <p className='waiting-icon-edit'><BsHourglassSplit/></p>
            } 
            {errorItem && 
                <p className='error-message-edit'>{errorItem}</p>
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

export default ProvidersEdit;