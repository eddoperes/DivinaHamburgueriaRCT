import { useFetchApi } from './useFetchApi';
import { useContext, useState } from "react";
import { MainContext } from '../contexts/MainContext'
import { Mutex } from 'async-mutex';
import { withTimeout } from 'async-mutex';

export const useFetchCustomers = () => {

    const [executing, setExecuting] = useState(false);
    const mutexWithTimeout = withTimeout(new Mutex(), 10);
    const mutexTimeoutErrorMessage = "timeout while waiting for mutex to become available";

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const customersGetAll = async () => {
        await apiGetMany(`${url}/customers`);
    }

    const customersGetByName = async (name) => {                        
        if (executing)
            return;
        setExecuting(true);
        try {
            await mutexWithTimeout.runExclusive(async () => {              
                // Dispatch the network request
                await apiGetMany(`${url}/customers/getbyname?name=${name}`);
                setExecuting(false);   
            });
        } catch (e) {                      
            if (e.message !== mutexTimeoutErrorMessage) {                           
              setExecuting(false);
              throw e; // let others bubble up
            }            
        }
    }

    const customersGetById = async (id) => {
        await apiGetById(`${url}/customers`, id);
    }

    const customersAdd = async (data) => {
        await apiAdd(`${url}/customers`, data);
    }

    const customersEdit = async (id, data) => {
        await apiEdit(`${url}/customers`, id, data);
    }

    const customersRemove = async (id) => {
        await apiRemove(`${url}/customers`, id);
    }

    return {data, error, unauthorized, executing,
            customersGetAll, 
            customersGetByName,
            customersGetById, 
            customersAdd, 
            customersEdit, 
            customersRemove};

}