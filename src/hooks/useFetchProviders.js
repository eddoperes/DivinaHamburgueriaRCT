import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchProviders = () => {

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const providersGetAll = async () => {
        await apiGetMany(`${url}/providers`);
    }

    const providersGetById = async (id) => {
        await apiGetById(`${url}/providers`, id);
    }

    const providersAdd = async (data) => {
        await apiAdd(`${url}/providers`, data);
    }

    const providersEdit = async (id, data) => {
        await apiEdit(`${url}/providers`, id, data);
    }

    const providersRemove = async (id) => {
        await apiRemove(`${url}/providers`, id);
    }

    return {data, error, unauthorized,
            providersGetAll, 
            providersGetById, 
            providersAdd, 
            providersEdit, 
            providersRemove};

}