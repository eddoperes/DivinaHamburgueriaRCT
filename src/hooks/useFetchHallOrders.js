import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchHallOrders = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit, apiPatch,
           apiRemove} = useFetchApi();

    const hallOrdersGetAll = async () => {
        await apiGetMany(`${url}/hallorders/${version}`);
    }

    const hallOrdersGetByCode = async (code) => {
        await apiGetMany(`${url}/hallorders/${version}/getbycode?code=${code}`);
    }

    const hallOrdersGetById = async (id) => {
        await apiGetById(`${url}/hallorders/${version}`, id);
    }

    const hallOrdersAdd = async (data) => {
        await apiAdd(`${url}/hallorders/${version}`, data);
    }

    const hallOrdersEdit = async (id, data) => {
        await apiEdit(`${url}/hallorders/${version}`, id, data);
    }

    const hallOrdersPatch = async (id, data) => {
        await apiPatch(`${url}/hallorders/${version}`, id, data);
    }

    const hallOrdersRemove = async (id) => {
        await apiRemove(`${url}/hallorders/${version}`, id);
    }

    return {data, error, unauthorized, waiting,
            hallOrdersGetAll, 
            hallOrdersGetByCode,
            hallOrdersGetById, 
            hallOrdersAdd, 
            hallOrdersEdit, 
            hallOrdersPatch,
            hallOrdersRemove};

}