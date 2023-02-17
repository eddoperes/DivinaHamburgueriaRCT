import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchQuantityAlarmsTriggered = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany} = useFetchApi();

    const quantityAlarmsTriggeredGetAll = async () => {
        await apiGetMany(`${url}/quantityalarmstriggered/${version}`);
    }

    return {data, error, unauthorized, waiting,
            quantityAlarmsTriggeredGetAll};

}