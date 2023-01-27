export const useFetchLocalStorage = () => {

    const set = (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    }

    const get = (key) => {
        const value = window.localStorage.getItem(key);
        if (value === null )
            return "";
        else
            return JSON.parse(value);
    }

    const remove = (key) => {
        window.localStorage.removeItem(key);
        return true;
    }

    const clear = () => {
        window.localStorage.clear();
        return true;
    }

    return {set, 
            get, 
            remove, 
            clear};

}