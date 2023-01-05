import { useFetchApi } from './useFetchApi';
import { useContext, useState } from "react";
import { MainContext } from '../contexts/MainContext'
import { Mutex } from 'async-mutex';
import { withTimeout, E_TIMEOUT } from 'async-mutex';

export const useFetchMenuItemsResale = () => {

    const [executing, setExecuting] = useState(false);
    const mutexWithTimeout = withTimeout(new Mutex(), 10);
    const mutexTimeoutErrorMessage = "timeout while waiting for mutex to become available";

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const menuItemsResaleGetAll = async () => {
        await apiGetMany(`${url}/menuitemsResale`);
    }

    const menuItemsResaleGetByName = async (name) => {                        
        if (executing)
            return;
        setExecuting(true);
        try {
            await mutexWithTimeout.runExclusive(async () => {              
                // Dispatch the network request
                await apiGetMany(`${url}/menuitemsResale/getbyname?name=${name}`);
                setExecuting(false);   
            });
        } catch (e) {                      
            if (e.message !== mutexTimeoutErrorMessage) {                           
              setExecuting(false);
              throw e; // let others bubble up
            }            
        }
    }

    const menuItemsResaleGetById = async (id) => {
        await apiGetById(`${url}/menuitemsResale`, id);
    }

    const menuItemsResaleAdd = async (data) => {
        await apiAdd(`${url}/menuitemsResale`, data);
    }

    const menuItemsResaleEdit = async (id, data) => {
        await apiEdit(`${url}/menuitemsResale`, id, data);
    }

    const menuItemsResaleRemove = async (id) => {
        await apiRemove(`${url}/menuitemsResale`, id);
    }

    return {data, error, unauthorized, executing,
            menuItemsResaleGetAll, 
            menuItemsResaleGetByName,
            menuItemsResaleGetById, 
            menuItemsResaleAdd, 
            menuItemsResaleEdit, 
            menuItemsResaleRemove};

}