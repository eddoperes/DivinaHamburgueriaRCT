import {useState} from 'react';

export const useFetchApi = () => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [unauthorized, setUnauthorized] =  useState(false);
    const [waiting, setWaiting] =  useState(false);

    const getToken = () => {
        const value = window.localStorage.getItem("token");
        if (value === null)
            return "";
        else
            return JSON.parse(value).accessToken;
    }

    let isWaitRequired;

    const requireWaiting = () => {                
        setTimeout(() => {
            if (isWaitRequired)
                setWaiting(true)
        }, 1000);                  
        isWaitRequired = true;      
    }

    const cancelWaiting = ()  => {
        isWaitRequired = false;
        setWaiting(false);
    }

    const apiGetMany = async (url) => {                      
        requireWaiting(); 
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
            setError(null);                                                        
        }
        catch(error)
        {
            setError(error.message);
            setData(null); 
        }    
        cancelWaiting();
    }

    const apiGetById = async (url, id) => {
        requireWaiting();  
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
            setError(null);                         
        }
        catch(error)
        {
            setError(error.message);
            setData(null);
        }
        cancelWaiting();
    }

    const apiAdd = async (url, data) => {
        requireWaiting();  
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
                //console.log(res)  
                const resBody = await res.json();
                throw new Error(`Not 2xx response ${JSON.stringify(resBody)}`);
            } 
            const resBody = await res.json();
            setData(resBody);           
            setError(null); 
        }
        catch(error)
        {
            setError(error.message);
            setData(null);
        }
        cancelWaiting();
    }

    const apiEdit = async (url, id, data) => {
        requireWaiting();  
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
            setError(null); 
        }
        catch(error)
        {
            setError(error.message);
        }
        cancelWaiting();
    }

    const apiPatch = async (url, id, data) => {
        requireWaiting();  
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
            setError(null); 
        }
        catch(error)
        {
            setError(error.message)
        }
        cancelWaiting();
    }

    const apiRemove = async (url, id) => {
        requireWaiting();  
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
            setError(null); 
        }
        catch(error)
        {
            setError(error.message)
        }
        cancelWaiting();
    }

    return {data, error, unauthorized, waiting,
            apiGetMany, apiGetById, 
            apiAdd, apiEdit, apiPatch, apiRemove};

}