//react hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";

//data hooks
import { useFetchDeliveryOrders } from "../../hooks/useFetchDeliveryOrders";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icones
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit, BsCurrencyDollar } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';        
import { GiCancel } from 'react-icons/gi';   
import { GoArrowRight } from 'react-icons/go';  

//custom
import AppMessageBox from '../../components/AppMessageBox';
     
const DeliveryOrdersList = () => {

    //state
    const [code, setCode] = useState('');   
    const [showConfirmPayment, setShowConfirmPayment] = useState([]);
    const [showConfirmCanceled, setShowConfirmCanceled] = useState([]);
    const [showConfirmProgress, setShowConfirmProgress] = useState([]);

    //ref
    const codeTxtRef = useRef(null);
    const codeRdbRef = useRef(null);
    const codeRdbQqRef = useRef(null);

    //data
    const { data: items, error, deliveryOrdersGetByCode, deliveryOrdersPatch, unauthorized: unauthorizedItem, waiting: showWaiting} = useFetchDeliveryOrders();
    const { set: localStorageSet , get: localStorageGet } = useFetchLocalStorage();

    //init
    const navigate = useNavigate();

    useEffect(() => {          
                 
        if(localStorageGet("deliverycodeChecked") === "" &&
            localStorageGet("deliverycodeQqChecked") === "")
        {
            localStorageSet("deliverycodeQqChecked", true);
            codeRdbQqRef.current.checked = true;
            codeTxtRef.current.disabled = true;                
            return;
        }     

        setCode(localStorageGet("deliverycode"));            
        if (localStorageGet("deliverycodeChecked") === true){
            codeRdbRef.current.checked = true;
            codeTxtRef.current.disabled = false;
        }
        if (localStorageGet("deliverycodeQqChecked") === true){
            codeRdbQqRef.current.checked = true;
            codeTxtRef.current.disabled = true;
        }           

        var sendCode = 0;
        if (codeRdbRef.current.checked)
            sendCode = localStorageGet("deliverycode"); 
        deliveryOrdersGetByCode(sendCode);
                        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {          
        if (unauthorizedItem){
            navigate("/login");
        }    
    }, [unauthorizedItem]); // eslint-disable-line react-hooks/exhaustive-deps

    //func
    const stateEnum = {
        Issued: 1,
        Canceled: 2,
        Packaged: 3,
        Delivered: 4
    };

    const paymentEnum = {
        Opened: 1,
        Paid: 2
    };

    function GetStateDescription(number){
        if (number === stateEnum.Issued)
            return "Emitido"
        else if (number === stateEnum.Canceled)
            return "Cancelado"
        else if (number === stateEnum.Packaged)
            return "Empacotado" 
        else if (number === stateEnum.Delivered)
            return "Entregue" 
    }

    function GetPaymentDescription(number){
        if (number === paymentEnum.Opened)
            return "Aberto"
        else if (number === paymentEnum.Paid)
            return "Pago"
    }

    async function  handleSubmit(e){
        e.preventDefault();

        var sendCode = 0;
        if (codeRdbRef.current.checked)
             sendCode = code                      
        await deliveryOrdersGetByCode(sendCode);

        localStorageSet("deliverycode", code);
        localStorageSet("deliverycodeChecked", codeRdbRef.current.checked);
        localStorageSet("deliverycodeQqChecked", codeRdbQqRef.current.checked);
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
        await deliveryOrdersPatch(id, data);
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
        } 
        await deliveryOrdersPatch(id, data);
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
        if (state === stateEnum.Issued)
            newState = stateEnum.Packaged;
        else if (state === stateEnum.Packaged)
            newState = stateEnum.Delivered;
        var data = {
            id: id,
            state: newState,
        } 
        await deliveryOrdersPatch(id, data);
    }

    return (
        <div>

            <h1 className='h1-list'>
                Pedidos delivery
            </h1> 
            
            <form className="form-list" onSubmit={handleSubmit}>

                <div className="main-filter">
                
                    <div className="left-filter">
                
                        <label>
                            <input type="radio"     
                                    ref={codeRdbRef}
                                    className="input-list"
                                    onChange={(e) => {codeTxtRef.current.disabled = false;}}                        
                                    id="code" 
                                    name="code" 
                                    />
                            Código
                        </label>
                                
                        <input type="text"
                               ref={codeTxtRef}
                               className="input-list input-list-text"
                               onChange={(e) => setCode(e.target.value)}
                               value={code}
                        />          

                    </div>

                    <div className="right-filter">

                        <label>
                            <input type="radio" 
                                    ref={codeRdbQqRef}
                                    className="input-list"
                                    onChange={(e) => {codeTxtRef.current.disabled = true;}}                        
                                    id="code" 
                                    name="code" 
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
                <Link to={'/DeliveryOrders/New'}>
                    <button className='button-new-list'>
                        <VscNewFile/>
                    </button>                
                </Link>     
            </div>

            {showWaiting && 
                <p className='waiting-icon-list'><BsHourglassSplit/></p>
            }            
            {error && !showWaiting  && 
                <p className='error-message-list'>{error}</p>
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

            {items && !showWaiting && <div className='card-container'>

                {items.map((item) => (
                    <div className='card' key={item.id}>
                        <div>
                            {item.id}
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
                            <Link to={`/DeliveryOrders/Edit/${item.id}`}>
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

export default DeliveryOrdersList