import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchPurchaseOrders = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit, apiPatch,
           apiRemove} = useFetchApi();

    const purchaseOrdersGetAll = async () => {
        await apiGetMany(`${url}/purchaseorders/${version}`);
    }

    const purchaseOrdersGetByProvider = async (providerid) => {
        await apiGetMany(`${url}/purchaseorders/${version}/getbyprovider?providerid=${providerid}`);
    }

    const purchaseOrdersGetById = async (id) => {
        await apiGetById(`${url}/purchaseorders/${version}`, id);
    }

    const purchaseOrdersAdd = async (data) => {
        await apiAdd(`${url}/purchaseorders/${version}`, data);
    }

    const purchaseOrdersEdit = async (id, data) => {
        await apiEdit(`${url}/purchaseorders/${version}`, id, data);
    }

    const purchaseOrdersPatch = async (id, data) => {
        await apiPatch(`${url}/purchaseorders/${version}`, id, data);
    }

    const purchaseOrdersRemove = async (id) => {
        await apiRemove(`${url}/purchaseorders/${version}`, id);
    }

    return {data, error, unauthorized, waiting,
            purchaseOrdersGetAll, 
            purchaseOrdersGetByProvider,
            purchaseOrdersGetById, 
            purchaseOrdersAdd, 
            purchaseOrdersEdit, 
            purchaseOrdersPatch,
            purchaseOrdersRemove};

}