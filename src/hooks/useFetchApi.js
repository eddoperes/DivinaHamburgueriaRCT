import {useState} from 'react';

export const useFetchApi = (url) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const apiGetAll = async () => {
        try
        {
            const res = await fetch(url);
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

    const apiGetById = async (id) => {
        try
        {
            const res = await fetch(`${url}/${id}`);
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

    const apiAdd = async (data) => {
        try
        {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            }); 
            if (res.ok === false){
                throw new Error("Not 2xx response");
            }           
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    const apiEdit = async (id, data) => {
        try
        {
            const res = await fetch(`${url}/${id}`, {
                method: "PUT",
                headers: {
                    "content-type" : "application/json"
                },
                body: JSON.stringify(data)
            }); 
            if (res.ok === false){
                throw new Error("Not 2xx response");
            }           
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    const apiRemove = async (id) => {
        try
        {
            const res = await fetch(`${url}/${id}`, {
                method: "DELETE",
            }); 
            if (res.ok === false){
                throw new Error("Not 2xx response");
            }           
        }
        catch(error)
        {
            setError(error.message)
        }
    }

    return {data, error, 
            apiGetAll, apiGetById, 
            apiAdd, apiEdit, apiRemove};

}