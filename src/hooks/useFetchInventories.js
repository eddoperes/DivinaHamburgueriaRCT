import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchInventories = () => {

    const { url } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const inventoryGetAll = async () => {
        await apiGetMany(`${url}/inventories`);
    }

    const inventoryGetByEatable = async (eatableid) => {
        await apiGetMany(`${url}/inventories/getbyeatable?eatableid=${eatableid}`);
    }

    const inventoryGetById = async (id) => {
        await apiGetById(`${url}/inventories`, id);
    }

    const inventoryAdd = async (data) => {
        await apiAdd(`${url}/inventories`, data);
    }

    const inventoryEdit = async (id, data) => {
        await apiEdit(`${url}/inventories`, id, data);
    }

    const inventoryRemove = async (id) => {
        await apiRemove(`${url}/inventories`, id);
    }

    return {data, error, unauthorized, waiting,
            inventoryGetAll, 
            inventoryGetByEatable,
            inventoryGetById, 
            inventoryAdd, 
            inventoryEdit, 
            inventoryRemove};

}