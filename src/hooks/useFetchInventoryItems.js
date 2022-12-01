import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchInventoryItems = () => {

    const { url } = useContext(MainContext);

    const {data, error, 
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const inventoryItemsGetAll = async () => {
        await apiGetMany(`${url}/inventoryitems`);
    }

    const inventoryItemsGetByNameAndOrType = async (name, type) => {
        await apiGetMany(`${url}/inventoryitems/getbynameandortype?name=${name}&type=${type}`);
    }

    const inventoryItemsGetById = async (id) => {
        await apiGetById(`${url}/inventoryitems`, id);
    }

    const inventoryItemsAdd = async (data) => {
        await apiAdd(`${url}/inventoryitems`, data);
    }

    const inventoryItemsEdit = async (id, data) => {
        await apiEdit(`${url}/inventoryitems`, id, data);
    }

    const inventoryItemsRemove = async (id) => {
        await apiRemove(`${url}/inventoryitems`, id);
    }

    return {data, error, 
            inventoryItemsGetAll, 
            inventoryItemsGetById, 
            inventoryItemsAdd, 
            inventoryItemsEdit, 
            inventoryItemsRemove,
            inventoryItemsGetByNameAndOrType};

}