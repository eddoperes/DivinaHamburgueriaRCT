import { useFetchApi } from './useFetchApi';
import { useContext, useState } from "react";
import { MainContext } from '../contexts/MainContext'
import { Mutex } from 'async-mutex';
import { withTimeout } from 'async-mutex';

export const useFetchMenuItemsRecipe = () => {

    const [executing, setExecuting] = useState(false);
    const mutexWithTimeout = withTimeout(new Mutex(), 10);
    const mutexTimeoutErrorMessage = "timeout while waiting for mutex to become available";

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const menuItemsRecipeGetAll = async () => {
        await apiGetMany(`${url}/menuitemsrecipe/${version}`);
    }

    const menuItemsRecipeGetByName = async (name) => {                        
        if (executing)
            return;
        setExecuting(true);
        try {
            await mutexWithTimeout.runExclusive(async () => {              
                // Dispatch the network request
                await apiGetMany(`${url}/menuitemsrecipe/${version}/getbyname?name=${name}`);
                setExecuting(false);   
            });
        } catch (e) {                      
            if (e.message !== mutexTimeoutErrorMessage) {                           
              setExecuting(false);
              throw e; // let others bubble up
            }            
        }
    }

    const menuItemsRecipeGetById = async (id) => {
        await apiGetById(`${url}/menuitemsrecipe/${version}`, id);
    }

    const menuItemsRecipeAdd = async (data) => {
        await apiAdd(`${url}/menuitemsrecipe/${version}`, data);
    }

    const menuItemsRecipeEdit = async (id, data) => {
        await apiEdit(`${url}/menuitemsrecipe/${version}`, id, data);
    }

    const menuItemsRecipeRemove = async (id) => {
        await apiRemove(`${url}/menuitemsrecipe/${version}`, id);
    }

    return {data, error, unauthorized,  waiting,
            menuItemsRecipeGetAll, 
            menuItemsRecipeGetByName,
            menuItemsRecipeGetById, 
            menuItemsRecipeAdd, 
            menuItemsRecipeEdit, 
            menuItemsRecipeRemove};

}