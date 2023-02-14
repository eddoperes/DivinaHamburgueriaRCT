import { useFetchApi } from './useFetchApi';
import { useContext, useState } from "react";
import { MainContext } from '../contexts/MainContext'
import { Mutex } from 'async-mutex';
import { withTimeout } from 'async-mutex';

export const useFetchMenus = () => {

    const [executing, setExecuting] = useState(false);
    const mutexWithTimeout = withTimeout(new Mutex(), 10);
    const mutexTimeoutErrorMessage = "timeout while waiting for mutex to become available";

    const { url } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const menusGetAll = async () => {
        await apiGetMany(`${url}/menus`);
    }

    const menusGetByName = async (name) => {                        
        if (executing)
            return;
        setExecuting(true);
        try {
            await mutexWithTimeout.runExclusive(async () => {              
                // Dispatch the network request
                await apiGetMany(`${url}/menus/getbyname?name=${name}`);
                setExecuting(false);   
            });
        } catch (e) {                      
            if (e.message !== mutexTimeoutErrorMessage) {                           
              setExecuting(false);
              throw e; // let others bubble up
            }            
        }
    }

    const menusGetById = async (id) => {
        await apiGetById(`${url}/menus`, id);
    }

    const menusAdd = async (data) => {
        await apiAdd(`${url}/menus`, data);
    }

    const menusEdit = async (id, data) => {
        await apiEdit(`${url}/menus`, id, data);
    }

    const menusRemove = async (id) => {
        await apiRemove(`${url}/menus`, id);
    }

    return {data, error, unauthorized,  waiting,
            menusGetAll, 
            menusGetByName,
            menusGetById, 
            menusAdd, 
            menusEdit, 
            menusRemove};

}