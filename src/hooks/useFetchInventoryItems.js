import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchInventoryItems = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const inventoryItemsGetAll = async () => {
        await apiGetMany(`${url}/inventoryitems/${version}`);
    }

    const inventoryItemsGetDistinctNames = async () => {        
        await apiGetMany(`${url}/inventoryitems/${version}/getdistinctnames`);
    }

    const inventoryItemsGetByNameAndOrType = async (name, type) => {
        await apiGetMany(`${url}/inventoryitems/${version}/getbynameandortype?name=${name}&type=${type}`);
    }

    const inventoryItemsGetById = async (id) => {
        await apiGetById(`${url}/inventoryitems/${version}`, id);
    }

    const inventoryItemsAdd = async (data) => {
        await apiAdd(`${url}/inventoryitems/${version}`, data);
    }

    const inventoryItemsEdit = async (id, data) => {
        await apiEdit(`${url}/inventoryitems/${version}`, id, data);
    }

    const inventoryItemsRemove = async (id) => {
        await apiRemove(`${url}/inventoryitems/${version}`, id);
    }

    return {data, error, unauthorized, waiting,
            inventoryItemsGetAll, 
            inventoryItemsGetById, 
            inventoryItemsAdd, 
            inventoryItemsEdit, 
            inventoryItemsRemove,
            inventoryItemsGetByNameAndOrType,
            inventoryItemsGetDistinctNames};

}