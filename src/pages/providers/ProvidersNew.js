//form component
import Providers from './Providers';

//react hooks
import { useNavigate } from "react-router-dom";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";

const ProvidersNew = () => {
    
     //data
    const { providersAdd } = useFetchProviders();

    //init
    const navigate = useNavigate();

    const configure = {
        disableInputs: false,
    }
          
    //func
    const handlePersistence = async (data) => {
        await providersAdd(data);
        navigate("/providers");        
    }

    return(
        <div>
            <h1 className='h1-edit'>Novo cliente</h1>
            <Providers handlePersistence={handlePersistence} 
                       configure={configure} >                            
            </Providers>
        </div>
    );

};

export default ProvidersNew;