import {useState} from 'react';

export const useFetchApi = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] =  useState(false);

    const getToken = () => {
        const value = window.localStorage.getItem("token");
        if (value === null)
            return "";
        else
            return JSON.parse(value);
    }

    const apiGetMany = async (url) => {
        try
        {
            const res = await fetch(url, {             
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
            });
            if (res.status === 401){
                setUnauthorized(true);
            }
            if (res.ok === false){                
                throw new Error("Not 2xx response");
            }
            const data = await res.json();
            setData(data);                        
        }
        catch(error)
        {
            setError(error.message);
        }   
    }

    const apiGetById = async (url, id) => {
        try
        {
            const res = await fetch(`${url}/${id}`, {             
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
            });
            if (res.status === 401){
                setUnauthorized(true);
            }
            if (res.ok === false){
                throw new Error("Not 2xx response");
            }
            const data = await res.json();
            setData(data);                        
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    const apiAdd = async (url, data) => {
        try
        {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization : `Bearer ${getToken()}`,
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            }); 
            if (res.status === 401){
                setUnauthorized(true);
            }
            if (res.ok === false){
                throw new Error("Not 2xx response");
            } 
            const resBody = await res.json();
            setData(resBody);           
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    const apiEdit = async (url, id, data) => {
        try
        {
            const res = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    Authorization : `Bearer ${getToken()}`,
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            }); 
            if (res.status === 401){
                setUnauthorized(true);
            }
            if (res.ok === false){
                throw new Error("Not 2xx response");
            }           
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    const apiPatch = async (url, id, data) => {
        try
        {
            const res = await fetch(`${url}/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization : `Bearer ${getToken()}`,
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            }); 
            if (res.status === 401){
                setUnauthorized(true);
            }
            if (res.ok === false){
                throw new Error("Not 2xx response");
            }           
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    const apiRemove = async (url, id) => {
        try
        {
            const res = await fetch(`${url}/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization : `Bearer ${getToken()}`
                }
            }); 
            if (res.status === 401){
                setUnauthorized(true);
            }
            if (res.ok === false){
                throw new Error("Not 2xx response");
            }           
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    return {data, error, unauthorized,
            apiGetMany, apiGetById, 
            apiAdd, apiEdit, apiPatch, apiRemove};

}