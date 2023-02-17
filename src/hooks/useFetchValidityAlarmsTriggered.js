import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchValidityAlarmsTriggered = () => {

    const { url, version } = useContext(MainContext);

    const {data, error, unauthorized, waiting,
           apiGetMany} = useFetchApi();

    const validityAlarmsTriggeredGetAll = async () => {
        await apiGetMany(`${url}/validityalarmstriggered/${version}`);
    }

    return {data, error, unauthorized, waiting,
            validityAlarmsTriggeredGetAll};

}