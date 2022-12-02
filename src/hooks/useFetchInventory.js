import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchInventory = () => {

    const { url } = useContext(MainContext);

    const {data, error, 
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const inventoryGetAll = async () => {
        await apiGetMany(`${url}/inventory`);
    }

    const inventoryGetById = async (id) => {
        await apiGetById(`${url}/inventory`, id);
    }

    const inventoryAdd = async (data) => {
        await apiAdd(`${url}/inventory`, data);
    }

    const inventoryEdit = async (id, data) => {
        await apiEdit(`${url}/inventory`, id, data);
    }

    const inventoryRemove = async (id) => {
        await apiRemove(`${url}/inventory`, id);
    }

    return {data, error, 
            inventoryGetAll, 
            inventoryGetById, 
            inventoryAdd, 
            inventoryEdit, 
            inventoryRemove,
            inventoryGetByNameAndOrType};

}