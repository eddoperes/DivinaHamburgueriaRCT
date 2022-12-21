import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchUnits = () => {

    const { url } = useContext(MainContext);

    const {data, error, unauthorized,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const unitsGetAll = async () => {
        await apiGetMany(`${url}/units`);
    }

    const unitsGetById = async (id) => {
        await apiGetById(`${url}/units`, id);
    }

    const unitsAdd = async (data) => {
        await apiAdd(`${url}/units`, data);
    }

    const unitsEdit = async (id, data) => {
        await apiEdit(`${url}/units`, id, data);
    }

    const unitsRemove = async (id) => {
        await apiRemove(`${url}/units`, id);
    }

    return {data, error, unauthorized,
            unitsGetAll, 
            unitsGetById, 
            unitsAdd, 
            unitsEdit, 
            unitsRemove};

}