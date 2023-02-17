import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchDeliveryOrders = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit, apiPatch,
           apiRemove} = useFetchApi();

    const deliveryOrdersGetAll = async () => {
        await apiGetMany(`${url}/deliveryorders/${version}`);
    }

    const deliveryOrdersGetByCode = async (code) => {
        await apiGetMany(`${url}/deliveryorders/${version}/getbycode?code=${code}`);
    }

    const deliveryOrdersGetById = async (id) => {
        await apiGetById(`${url}/deliveryorders/${version}`, id);
    }

    const deliveryOrdersAdd = async (data) => {
        await apiAdd(`${url}/deliveryorders/${version}`, data);
    }

    const deliveryOrdersEdit = async (id, data) => {
        await apiEdit(`${url}/deliveryorders/${version}`, id, data);
    }

    const deliveryOrdersPatch = async (id, data) => {
        await apiPatch(`${url}/deliveryorders/${version}`, id, data);
    }

    const deliveryOrdersRemove = async (id) => {
        await apiRemove(`${url}/deliveryorders/${version}`, id);
    }

    return {data, error, unauthorized, waiting,
            deliveryOrdersGetAll, 
            deliveryOrdersGetByCode,
            deliveryOrdersGetById, 
            deliveryOrdersAdd, 
            deliveryOrdersEdit, 
            deliveryOrdersPatch,
            deliveryOrdersRemove};

}