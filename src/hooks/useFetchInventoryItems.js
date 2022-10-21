import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchInventoryItems = () => {

    const { url } = useContext(MainContext);

    const {data, error, 
           apiGetAll, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi(`${url}/inventoryitems`);

    const inventoryItemsGetAll = async () => {
        await apiGetAll();
    }

    const inventoryItemsGetById = async (id) => {
        await apiGetById(id);
    }

    const inventoryItemsAdd = async (data) => {
        await apiAdd(data);
    }

    const inventoryItemsEdit = async (id, data) => {
        await apiEdit(id, data);
    }

    const inventoryItemsRemove = async (id) => {
        await apiRemove(id);
    }

    return {data, error, 
            inventoryItemsGetAll, 
            inventoryItemsGetById, 
            inventoryItemsAdd, 
            inventoryItemsEdit, 
            inventoryItemsRemove};

}