//react hooks
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";
import { useFetchPurchaseOrders } from "../../hooks/useFetchPurchaseOrders";

//icones
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';        

const PurchaseOrdersList = () => {

    //state
    const [providerId, setProviderId] = useState(1);
    const [showWaiting, setShowWaiting] = useState(false);
    const [showWaitingProviders, setShowWaitingProviders] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    //ref
    const providerSelRef = useRef(null);
    const providerRdbRef = useRef(null);

    //data
    const { data: providers, error: errorProviders, providersGetAll} = useFetchProviders();    
    if (providers === null) {
        setTimeout(() => {
            setShowWaitingProviders(true);
        }, 1000);
        providersGetAll();        
    }
    const {data: items, error, purchaseOrdersGetByProvider} = useFetchPurchaseOrders();

    //init
    useEffect(() => {   
        if (providerRdbRef.current !== null)          
            providerRdbRef.current.checked = true;
    }, [providers]);

    //func
    function GetProviderName(id){
        return providers.filter(p => p.id === id)[0].name;
    }

    function GetStateDescription(number){
        if (number === 1)
            return "Cotação"
        else if (number === 2)
            return "Emitido"
        else if (number === 3)
            return "Cancelado"
        else if (number === 4)
            return "Entregue" 
        else if (number === 5)
            return "Estocado" 
    }

    function GetPaymentDescription(number){
        if (number === 1)
            return "Aberto"
        else if (number === 2)
            return "Pago"
    }

    async function  handleSubmit(e){
        e.preventDefault();
        setTimeout(() => {
            setShowWaiting(true);
            setRefreshing(true);
        }, 1000);        
        await purchaseOrdersGetByProvider(providerId);
        setRefreshing(false);
    }

    return (
        <div>

            <h1 className='h1-list'>
                Pedidos de compra
            </h1> 
            
            <form className="form-list" onSubmit={handleSubmit}>

                    {providers &&

                        <div className="main-filter">
                        
                            <div className="left-filter">
                        
                                <label>
                                    <input type="radio" 
                                        ref={providerRdbRef}
                                        className="input-list"
                                        onChange={(e) => {
                                                            setProviderId(e.target.value);
                                                            providerSelRef.current.disabled = false;
                                                        }}                        
                                        id="type" 
                                        name="type" 
                                        value={providers[0].id}  />
                                    Fornecedor
                                </label>
                                        
                                <select value={providerId}
                                        ref={providerSelRef}
                                        className="select-list"
                                        onChange={(e) => setProviderId(e.target.value)}                
                                >
                                    {providers.map((provider) => (
                                        <option key={provider.id} value={provider.id}>
                                            {provider.name}
                                        </option>                   
                                    ))}
                                </select>          

                            </div>

                            <div className="right-filter">

                                <label>
                                    <input type="radio" 
                                        className="input-list"
                                        onChange={(e) => {
                                                            setProviderId(e.target.value);
                                                            providerSelRef.current.disabled = true;
                                                        }}                        
                                        id="type" 
                                        name="type" 
                                        value="0"  />
                                    Qualquer
                                </label>

                            </div>

                        </div>

                    }

                    <div>
                        <input type="submit" 
                            className="input-list-submit" 
                            value="Pesquisar" >                    
                        </input>
                    </div> 
                    <div className='clear-both'>
                    </div>       

                </form>

                <div className='button-new-list-container'>
                    <Link to={'/PurchaseOrders/New'}>
                        <button className='button-new-list'>
                            <VscNewFile/>
                        </button>                
                    </Link>     
                </div>

                {(!items && (!error || refreshing) && showWaiting) && 
                    <p className='waiting-icon-list'><BsHourglassSplit/></p>
                }            
                {!items && error && !refreshing && 
                    <p className='error-message-list'>{error}</p>
                }
                {(!providers && (!errorProviders || refreshing) && showWaitingProviders) && 
                    <p className='waiting-icon-list'><BsHourglassSplit/></p>
                }  
                {!providers && errorProviders && !refreshing &&  
                    <p className='error-message-list'>{errorProviders}</p>
                }

                {(items && providers) && <div className='card-container'>
                    {items.map((item) => (
                        <div className='card' key={item.id}>
                            <div>
                                {GetProviderName(item.providerId)}
                            </div>                        
                            <div>
                            
                            </div>
                            <div>
                                {item.observation}                                           
                            </div>   
                            <div>
                                {GetStateDescription(item.state)}                                           
                            </div> 
                            <div>
                                {GetPaymentDescription(item.payment)}                                           
                            </div> 
                            <div>

                                {new Intl.NumberFormat('pt-BR', 
                                    {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }
                                ).format(item.total)}
                                
                            </div> 
                            <div>
                                <Link to={`/PurchaseOrders/Edit/${item.id}`}>
                                    <button className='button-edit-list'>
                                        <AiFillEdit />
                                    </button>                       
                                </Link>                                                                                                                                                                 
                            </div>                    
                        </div>                    
                    )
                )}
            </div>}

        </div>
    )

}

export default PurchaseOrdersList