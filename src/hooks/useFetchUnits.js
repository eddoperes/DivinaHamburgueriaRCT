import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchUnits = () => {

    const { url } = useContext(MainContext);

    const {data, error, 
           apiGetAll, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi(`${url}/units`);

    const unitsGetAll = async () => {
        await apiGetAll();
    }

    const unitsGetById = async (id) => {
        await apiGetById(id);
    }

    const unitsAdd = async (data) => {
        await apiAdd(data);
    }

    const unitsEdit = async (id, data) => {
        await apiEdit(id, data);
    }

    const unitsRemove = async (id) => {
        await apiRemove(id);
    }

    return {data, error, 
            unitsGetAll, 
            unitsGetById, 
            unitsAdd, 
            unitsEdit, 
            unitsRemove};

}