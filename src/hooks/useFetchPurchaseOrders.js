import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchPurchaseOrders = () => {

    const { url } = useContext(MainContext);

    const {data, error, 
           apiGetMany, apiGetById, 
           apiAdd, apiEdit, apiPatch,
           apiRemove} = useFetchApi();

    const purchaseOrdersGetAll = async () => {
        await apiGetMany(`${url}/purchaseorders`);
    }

    const purchaseOrdersGetByProvider = async (providerid) => {
        await apiGetMany(`${url}/purchaseorders/getbyprovider?providerid=${providerid}`);
    }

    const purchaseOrdersGetById = async (id) => {
        await apiGetById(`${url}/purchaseorders`, id);
    }

    const purchaseOrdersAdd = async (data) => {
        await apiAdd(`${url}/purchaseorders`, data);
    }

    const purchaseOrdersEdit = async (id, data) => {
        await apiEdit(`${url}/purchaseorders`, id, data);
    }

    const purchaseOrdersPatch = async (id, data) => {
        await apiPatch(`${url}/purchaseorders`, id, data);
    }

    const purchaseOrdersRemove = async (id) => {
        await apiRemove(`${url}/purchaseorders`, id);
    }

    return {data, error, 
            purchaseOrdersGetAll, 
            purchaseOrdersGetByProvider,
            purchaseOrdersGetById, 
            purchaseOrdersAdd, 
            purchaseOrdersEdit, 
            purchaseOrdersPatch,
            purchaseOrdersRemove};

}