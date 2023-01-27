import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchHallOrders = () => {

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit, apiPatch,
           apiRemove} = useFetchApi();

    const hallOrdersGetAll = async () => {
        await apiGetMany(`${url}/allorders`);
    }

    const hallOrdersGetByCode = async (code) => {
        await apiGetMany(`${url}/hallorders/getbycode?code=${code}`);
    }

    const hallOrdersGetById = async (id) => {
        await apiGetById(`${url}/hallorders`, id);
    }

    const hallOrdersAdd = async (data) => {
        await apiAdd(`${url}/hallorders`, data);
    }

    const hallOrdersEdit = async (id, data) => {
        await apiEdit(`${url}/hallorders`, id, data);
    }

    const hallOrdersPatch = async (id, data) => {
        await apiPatch(`${url}/hallorders`, id, data);
    }

    const hallOrdersRemove = async (id) => {
        await apiRemove(`${url}/hallorders`, id);
    }

    return {data, error, unauthorized,
            hallOrdersGetAll, 
            hallOrdersGetByCode,
            hallOrdersGetById, 
            hallOrdersAdd, 
            hallOrdersEdit, 
            hallOrdersPatch,
            hallOrdersRemove};

}