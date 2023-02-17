import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchAlarms = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const alarmsGetAll = async () => {
        await apiGetMany(`${url}/alarms/${version}`);
    }

    const alarmsGetByEatable = async (eatableid) => {
        await apiGetMany(`${url}/alarms/${version}/getbyeatable?eatableid=${eatableid}`);
    }

    const alarmsGetById = async (id) => {
        await apiGetById(`${url}/alarms/${version}`, id);
    }

    const alarmsAdd = async (data) => {
        await apiAdd(`${url}/alarms/${version}`, data);
    }

    const alarmsEdit = async (id, data) => {
        await apiEdit(`${url}/alarms/${version}`, id, data);
    }

    const alarmsRemove = async (id) => {
        await apiRemove(`${url}/alarms/${version}`, id);
    }

    return {data, error, unauthorized, waiting,
            alarmsGetAll, 
            alarmsGetByEatable,
            alarmsGetById, 
            alarmsAdd, 
            alarmsEdit, 
            alarmsRemove};

}