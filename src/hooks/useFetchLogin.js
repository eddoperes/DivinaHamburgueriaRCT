import { useFetchApi } from './useFetchApi';
import { useContext } from "react";
import { MainContext } from '../contexts/MainContext'

export const useFetchLogin = () => {

    const { url } = useContext(MainContext);

    const {data, error, 
           apiAdd} = useFetchApi();

    const login = async (data) => {
        await apiAdd(`${url}/Tokens/LoginUser`, data);
    }

    return {data, error, 
            login};

}