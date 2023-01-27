//react hooks
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef} from "react";

//data hooks
import { useFetchHallOrders } from "../../hooks/useFetchHallOrders";
import { useFetchLocalStorage } from "../../hooks/useFetchLocalStorage";

//icones
import { VscNewFile } from 'react-icons/vsc';
import { BsHourglassSplit } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';        
import { GiCancel } from 'react-icons/gi';   
import { GoArrowRight } from 'react-icons/go';  

//custom
import AppMessageBox from '../../components/AppMessageBox';
     
const HallOrdersList = () => {

    //state
    const [code, setCode] = useState('');
    const [showWaiting, setShowWaiting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);    
    const [showConfirmCanceled, setShowConfirmCanceled] = useState([]);
    const [showConfirmProgress, setShowConfirmProgress] = useState([]);

    //ref
    const codeTxtRef = useRef(null);
    const codeRdbRef = useRef(null);
    const codeRdbQqRef = useRef(null);

    //data
    const { data: items, error, hallOrdersGetByCode, hallOrdersPatch, unauthorized: unauthorizedItem} = useFetchHallOrders();
    const { set: localStorageSet , get: localStorageGet } = useFetchLocalStorage();

    //init
    const navigate = useNavigate();

    useEffect(() => {          
        
        if (code === '' &&                         
            items === null){

            if (code === localStorageGet("code") &&
                code !== '')
                return;            

            if(localStorageGet("codeChecked") === "" &&
               localStorageGet("codeQqChecked") === "")
            {
                localStorageSet("codeQqChecked", true);
                codeRdbQqRef.current.checked = true;
                codeTxtRef.current.disabled = true;                
                return;
            }     

            setCode(localStorageGet("code"));            
            if (localStorageGet("codeChecked") === true){
                codeRdbRef.current.checked = true;
                codeTxtRef.current.disabled = false;
            }
            if (localStorageGet("codeQqChecked") === true){
                codeRdbQqRef.current.checked = true;
                codeTxtRef.current.disabled = true;
            }           

            var sendCode = 0;
            if (codeRdbRef.current.checked)
                sendCode = localStorageGet("code"); 
            hallOrdersGetByCode(sendCode);
            
        }
            
    }, [localStorageGet]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {          
        if (unauthorizedItem){
            navigate("/login");
        }    
    }, [unauthorizedItem]); // eslint-disable-line react-hooks/exhaustive-deps

    //func
    const stateEnum = {
        Issued: 1,
        Canceled: 2,
        Served: 3
    };

    function GetStateDescription(number){
        if (number === stateEnum.Issued)
            return "Emitido"
        else if (number === stateEnum.Canceled)
            return "Cancelado"
        else if (number === stateEnum.Served)
            return "Servido" 
    }

    async function  handleSubmit(e){
        e.preventDefault();
        setTimeout(() => {
            setShowWaiting(true);
            setRefreshing(true);
        }, 1000); 

        var sendCode = 0;
        if (codeRdbRef.current.checked)
             sendCode = code                      
        await hallOrdersGetByCode(sendCode);

        setRefreshing(false);
        localStorageSet("code", code);
        localStorageSet("codeChecked", codeRdbRef.current.checked);
        localStorageSet("codeQqChecked", codeRdbQqRef.current.checked);
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
        await hallOrdersPatch(id, data);
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
            newState = stateEnum.Served;
        var data = {
            id: id,
            state: newState,
        } 
        await hallOrdersPatch(id, data);
    }

    return (
        <div>

            <h1 className='h1-list'>
                Pedidos salão
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
                <Link to={'/HallOrders/New'}>
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


            <AppMessageBox handleConfirmed={handleCanceledConfirmed}
                           handleRegister={handleRegisterCanceledMessageBox}
            >
            </AppMessageBox>

            <AppMessageBox handleConfirmed={handleProgressConfirmed}
                           handleRegister={handleRegisterProgressMessageBox} 
            >
            </AppMessageBox>

            {(items ) && <div className='card-container'>

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
                            {"Pago"}                                           
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
                            <Link to={`/HallOrders/Edit/${item.id}`}>
                                <button className='button-edit-list'>
                                    <AiFillEdit />
                                </button>    
                            </Link> 
         
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

export default HallOrdersList