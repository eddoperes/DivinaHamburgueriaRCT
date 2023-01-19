import { useFetchApi } from './useFetchApi';
import { useContext, useState } from "react";
import { MainContext } from '../contexts/MainContext'
import { Mutex } from 'async-mutex';
import { withTimeout } from 'async-mutex';

export const useFetchProviders = () => {

    const [executing, setExecuting] = useState(false);
    const mutexWithTimeout = withTimeout(new Mutex(), 10);
    const mutexTimeoutErrorMessage = "timeout while waiting for mutex to become available";

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const providersGetAll = async () => {
        await apiGetMany(`${url}/providers`);
    }

    const providersGetByName = async (name) => {                        
        if (executing)
            return;
        setExecuting(true);
        try {
            await mutexWithTimeout.runExclusive(async () => {              
                // Dispatch the network request
                await apiGetMany(`${url}/providers/getbyname?name=${name}`);
                setExecuting(false);   
            });
        } catch (e) {                      
            if (e.message !== mutexTimeoutErrorMessage) {                           
              setExecuting(false);
              throw e; // let others bubble up
            }            
        }
    }

    const providersGetById = async (id) => {
        await apiGetById(`${url}/providers`, id);
    }

    const providersAdd = async (data) => {
        await apiAdd(`${url}/providers`, data);
    }

    const providersEdit = async (id, data) => {
        await apiEdit(`${url}/providers`, id, data);
    }

    const providersRemove = async (id) => {
        await apiRemove(`${url}/providers`, id);
    }

    return {data, error, unauthorized,
            providersGetAll, 
            providersGetByName,
            providersGetById, 
            providersAdd, 
            providersEdit, 
            providersRemove};

}