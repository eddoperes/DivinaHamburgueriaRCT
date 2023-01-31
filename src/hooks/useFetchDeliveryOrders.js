import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchDeliveryOrders = () => {

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit, apiPatch,
           apiRemove} = useFetchApi();

    const deliveryOrdersGetAll = async () => {
        await apiGetMany(`${url}/allorders`);
    }

    const deliveryOrdersGetByCode = async (code) => {
        await apiGetMany(`${url}/deliveryorders/getbycode?code=${code}`);
    }

    const deliveryOrdersGetById = async (id) => {
        await apiGetById(`${url}/deliveryorders`, id);
    }

    const deliveryOrdersAdd = async (data) => {
        await apiAdd(`${url}/deliveryorders`, data);
    }

    const deliveryOrdersEdit = async (id, data) => {
        await apiEdit(`${url}/deliveryorders`, id, data);
    }

    const deliveryOrdersPatch = async (id, data) => {
        await apiPatch(`${url}/deliveryorders`, id, data);
    }

    const deliveryOrdersRemove = async (id) => {
        await apiRemove(`${url}/deliveryorders`, id);
    }

    return {data, error, unauthorized,
            deliveryOrdersGetAll, 
            deliveryOrdersGetByCode,
            deliveryOrdersGetById, 
            deliveryOrdersAdd, 
            deliveryOrdersEdit, 
            deliveryOrdersPatch,
            deliveryOrdersRemove};

}