import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchInventories = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const inventoryGetAll = async () => {
        await apiGetMany(`${url}/inventories/${version}`);
    }

    const inventoryGetByEatable = async (eatableid) => {
        await apiGetMany(`${url}/inventories/${version}/getbyeatable?eatableid=${eatableid}`);
    }

    const inventoryGetById = async (id) => {
        await apiGetById(`${url}/inventories/${version}`, id);
    }

    const inventoryAdd = async (data) => {
        await apiAdd(`${url}/inventories/${version}`, data);
    }

    const inventoryEdit = async (id, data) => {
        await apiEdit(`${url}/inventories/${version}`, id, data);
    }

    const inventoryRemove = async (id) => {
        await apiRemove(`${url}/inventories/${version}`, id);
    }

    return {data, error, unauthorized, waiting,
            inventoryGetAll, 
            inventoryGetByEatable,
            inventoryGetById, 
            inventoryAdd, 
            inventoryEdit, 
            inventoryRemove};

}