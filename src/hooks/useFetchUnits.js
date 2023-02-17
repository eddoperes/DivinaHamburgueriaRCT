import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchUnits = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany, apiGetById, 
           apiAdd, apiEdit,
           apiRemove} = useFetchApi();

    const unitsGetAll = async () => {
        await apiGetMany(`${url}/units/${version}`);
    }

    const unitsGetById = async (id) => {
        await apiGetById(`${url}/units/${version}`, id);
    }

    const unitsAdd = async (data) => {
        await apiAdd(`${url}/units/${version}`, data);
    }

    const unitsEdit = async (id, data) => {
        await apiEdit(`${url}/units/${version}`, id, data);
    }

    const unitsRemove = async (id) => {
        await apiRemove(`${url}/units/${version}`, id);
    }

    return {data, error, unauthorized, waiting,
            unitsGetAll, 
            unitsGetById, 
            unitsAdd, 
            unitsEdit, 
            unitsRemove};

}