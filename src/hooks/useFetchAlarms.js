import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchAlarms = () => {

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const alarmsGetAll = async () => {
        await apiGetMany(`${url}/alarms`);
    }

    const alarmsGetByEatable = async (eatableid) => {
        await apiGetMany(`${url}/alarms/getbyeatable?eatableid=${eatableid}`);
    }

    const alarmsGetById = async (id) => {
        await apiGetById(`${url}/alarms`, id);
    }

    const alarmsAdd = async (data) => {
        await apiAdd(`${url}/alarms`, data);
    }

    const alarmsEdit = async (id, data) => {
        await apiEdit(`${url}/alarms`, id, data);
    }

    const alarmsRemove = async (id) => {
        await apiRemove(`${url}/alarms`, id);
    }

    return {data, error, unauthorized,
            alarmsGetAll, 
            alarmsGetByEatable,
            alarmsGetById, 
            alarmsAdd, 
            alarmsEdit, 
            alarmsRemove};

}