//react hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";

//data hooks
import { useFetchProviders } from "../../hooks/useFetchProviders";
import { useFetchPurchaseOrders } from "../../hooks/useFetchPurchaseOrders";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icones
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit, BsCurrencyDollar } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';        
import { GiCancel } from 'react-icons/gi';   
import { GoArrowRight } from 'react-icons/go';  

//custom
import AppMessageBox from '../../components/AppMessageBox';
     
const PurchaseOrdersList = () => {

    //state
    const [providerId, setProviderId] = useState(1);
    const [showWaiting, setShowWaiting] = useState(false);
    const [showWaitingProviders, setShowWaitingProviders] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showConfirmPayment, setShowConfirmPayment] = useState([]);
    const [showConfirmCanceled, setShowConfirmCanceled] = useState([]);
    const [showConfirmProgress, setShowConfirmProgress] = useState([]);

    //ref
    const providerSelRef = useRef(null);
    const providerRdbRef = useRef(null);
    const providerRdbQqRef = useRef(null);

    //data
    const { data: providers, error: errorProviders, unauthorized: unauthorizedProviders, providersGetAll} = useFetchProviders();    
    if (providers === null) {
        setTimeout(() => {
            setShowWaitingProviders(true);
        }, 1000);
        providersGetAll();        
    }
    const { data: items, error, purchaseOrdersGetByProvider, purchaseOrdersPatch, unauthorized: unauthorizedItem} = useFetchPurchaseOrders();
    const { set: localStorageSet , get: localStorageGet } = useFetchLocalStorage();

    //init
    const navigate = useNavigate();

    useEffect(() => {          
        
        if (providers !== null &&                         
            items === null){

            if (providerId === localStorageGet("providerId"))
                return;

            setProviderId(localStorageGet("providerId"));            
            if (localStorageGet("providerIdChecked") === true){
                providerRdbRef.current.checked = true;
                providerSelRef.current.disabled = false;
            }
            if (localStorageGet("providerIdQqChecked") === true){
                providerRdbQqRef.current.checked = true;
                providerSelRef.current.disabled = true;
            }
            else{
                providerRdbRef.current.checked = true;
            }

            var sendProviderId = 0;
            if (providerRdbRef.current.checked)
                sendProviderId = localStorageGet("providerId"); 
            purchaseOrdersGetByProvider(sendProviderId);
            
        }
            
    }, [localStorageGet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {          
        if (unauthorizedItem || unauthorizedProviders){
            navigate("/login");
        }    
    }, [unauthorizedItem, unauthorizedProviders]); // eslint-disable-line react-hooks/exhaustive-deps

    //func
    const stateEnum = {
        Quotation: 1,
        Issued: 2,
        Canceled: 3,
        Arrived: 4,
        Stocked: 5
    };

    const paymentEnum = {
        Opened: 1,
        Paid: 2
    };

    function GetProviderName(id){
        return providers.filter(p => p.id === id)[0].name;
    }

    function GetStateDescription(number){
        if (number === stateEnum.Quotation)
            return "Cotação"
        else if (number === stateEnum.Issued)
            return "Emitido"
        else if (number === stateEnum.Canceled)
            return "Cancelado"
        else if (number === stateEnum.Arrived)
            return "Entregue" 
        else if (number === stateEnum.Stocked)
            return "Estocado" 
    }

    function GetPaymentDescription(number){
        if (number === paymentEnum.Opened)
            return "Aberto"
        else if (number === paymentEnum.Paid)
            return "Pago"
    }

    async function  handleSubmit(e){
        e.preventDefault();
        setTimeout(() => {
            setShowWaiting(true);
            setRefreshing(true);
        }, 1000); 

        var sendProviderId = 0;
        if (providerRdbRef.current.checked)
             sendProviderId = providerId        
        await purchaseOrdersGetByProvider(sendProviderId);

        setRefreshing(false);
        localStorageSet("providerId", providerId);
        localStorageSet("providerIdChecked", providerRdbRef.current.checked);
        localStorageSet("providerIdQqChecked", providerRdbQqRef.current.checked);
    }

    async function handleRegisterPaymentMessageBox(showPointer){  
        showConfirmPayment.push(showPointer);
        setShowConfirmPayment(showConfirmPayment);
    }

    async function handleConfirmPayment(e, id, state, payment){
        e.preventDefault();
        showConfirmPayment[0](id, state, payment, 
                              e.pageX, e.pageY, 'info',
                              'Confirma o pagamento?');
    }

    async function handlePaymentConfirmed(id, state, payment){
        var data = {
            id: id,
            state: state,
            payment: paymentEnum.Paid
        } 
        await purchaseOrdersPatch(id, data);
    }

    async function handleRegisterCanceledMessageBox(showPointer){        
        showConfirmCanceled.push(showPointer);
        setShowConfirmCanceled(showConfirmCanceled);
    }

    async function handleConfirmCanceled(e, id, state, payment){
        e.preventDefault();
        showConfirmCanceled[0](id, state, payment, 
                               e.pageX, e.pageY, 'danger',
                               'Confirma o cancelamento?');
    }

    async function handleCanceledConfirmed(id, state, payment){
        var data = {
            id: id,
            state: stateEnum.Canceled,
            payment: payment
        } 
        await purchaseOrdersPatch(id, data);
    }

    async function handleRegisterProgressMessageBox(showPointer){  
        showConfirmProgress.push(showPointer);
        setShowConfirmProgress(showConfirmProgress);
    }

    async function handleConfirmProgress(e, id, state, payment){
        e.preventDefault();
        showConfirmProgress[0](id, state, payment, 
                               e.pageX, e.pageY, 'warning',
                               'Confirma a progressão?');
    }

    async function handleProgressConfirmed(id, state, payment){
        var newState = state;
        if (state === stateEnum.Quotation)
            newState = stateEnum.Issued;
        else if (state === stateEnum.Issued)
            newState = stateEnum.Arrived;
        var data = {
            id: id,
            state: newState,
            payment: payment
        } 
        await purchaseOrdersPatch(id, data);
    }

    return (
        <div>

            <h1 className='h1-list'>
                Pedidos de compra
            </h1> 
            
            <form className="form-list" onSubmit={handleSubmit}>

                <div className="main-filter">
                
                    <div className="left-filter">
                
                        <label>
                            <input type="radio"     
                                    ref={providerRdbRef}
                                    className="input-list"
                                    onChange={(e) => {providerSelRef.current.disabled = false;}}                        
                                    id="type" 
                                    name="type" 
                                    />
                            Fornecedor
                        </label>
                                
                        <select value={providerId}
                                ref={providerSelRef}
                                className="select-list"
                                onChange={(e) => setProviderId(e.target.value)}                
                        >
                            {providers && providers.map((provider) => (
                                <option key={provider.id} value={provider.id}>
                                    {provider.name}
                                </option>                   
                            ))}
                        </select>          

                    </div>

                    <div className="right-filter">

                        <label>
                            <input type="radio" 
                                    ref={providerRdbQqRef}
                                    className="input-list"
                                    onChange={(e) => {providerSelRef.current.disabled = true;}}                        
                                    id="type" 
                                    name="type" 
                                    value="0"  />
                            Qualquer
                        </label>

                    </div>

                </div>

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

            <AppMessageBox handleConfirmed={handlePaymentConfirmed}
                           handleRegister={handleRegisterPaymentMessageBox} 
            >
            </AppMessageBox>

            <AppMessageBox handleConfirmed={handleCanceledConfirmed}
                           handleRegister={handleRegisterCanceledMessageBox}
            >
            </AppMessageBox>

            <AppMessageBox handleConfirmed={handleProgressConfirmed}
                           handleRegister={handleRegisterProgressMessageBox} 
            >
            </AppMessageBox>

            {(items && providers) && <div className='card-container'>

                {items.map((item) => (
                    <div className='card' key={item.id}>
                        <div>
                            {GetProviderName(item.providerId)}
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
                            <button className='button-payment-list' 
                                    onClick={(e) => handleConfirmPayment(e, item.id, item.state, item.payment)}>
                                <BsCurrencyDollar />
                            </button>           
                            <button className='button-remove-list'
                                    onClick={(e) => handleConfirmCanceled(e, item.id, item.state, item.payment)}>
                                <GiCancel />
                            </button>    
                            <button className='button-progress-list'
                                    onClick={(e) => handleConfirmProgress(e, item.id, item.state, item.payment)}>
                                <GoArrowRight />
                            </button>       
                        </div>       
                    </div>                    
                )
            )}
            </div>}

        </div>
    )

}

export default PurchaseOrdersList