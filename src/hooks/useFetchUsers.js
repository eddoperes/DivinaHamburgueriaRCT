import { useFetchApi } from './useFetchApi';
import { useContext, useState } from "react";
import { MainContext } from '../contexts/MainContext'
import { Mutex } from 'async-mutex';
import { withTimeout } from 'async-mutex';

export const useFetchUsers = () => {

    const [executing, setExecuting] = useState(false);
    const mutexWithTimeout = withTimeout(new Mutex(), 10);
    const mutexTimeoutErrorMessage = "timeout while waiting for mutex to become available";

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiPatch, 
           apiRemove} = useFetchApi();

    const usersGetAll = async () => {
        await apiGetMany(`${url}/users`);
    }

    const usersGetByName = async (name) => {                        
        if (executing)
            return;
        setExecuting(true);
        try {
            await mutexWithTimeout.runExclusive(async () => {              
                // Dispatch the network request
                await apiGetMany(`${url}/users/getbyname?name=${name}`);
                setExecuting(false);   
            });
        } catch (e) {                      
            if (e.message !== mutexTimeoutErrorMessage) {                           
              setExecuting(false);
              throw e; // let others bubble up
            }            
        }
    }

    const usersGetById = async (id) => {
        await apiGetById(`${url}/users`, id);
    }

    const usersAdd = async (data) => {
        await apiAdd(`${url}/users`, data);
    }

    const usersEdit = async (id, data) => {
        await apiPatch(`${url}/users`, id, data);
    }

    const usersRemove = async (id) => {
        await apiRemove(`${url}/users`, id);
    }

    return {data, error, unauthorized, executing,
            usersGetAll, 
            usersGetByName,
            usersGetById, 
            usersAdd, 
            usersEdit, 
            usersRemove};

}