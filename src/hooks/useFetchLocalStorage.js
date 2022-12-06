export const useFetchLocalStorage = () => {

    const set = (key, value) => {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
    }

    const get = (key) => {
        const value = window.localStorage.getItem(key);
        if (value === null)
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

/*

 private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  set(key: string, value: any): boolean {
    if (this.storage) {
      this.storage.setItem(key, JSON.stringify(value));
      return true;
    }
    return false;
  }

  get(key: string): any {
    if (this.storage) {
      var value = this.storage.getItem(key);
      if (value === null)
        return "";
      else
        return JSON.parse(value);
    }
    return null;
  }

  remove(key: string): boolean {
    if (this.storage) {
      this.storage.removeItem(key);
      return true;
    }
    return false;
  }

  clear(): boolean {
    if (this.storage) {
      this.storage.clear();
      return true;
    }
    return false;
  }


*/