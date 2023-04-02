export enum StorageKeys { 
    Users = 'users'
}
 
export function useStorage() {
    const BASE_KEY = '@outdoor:1.0-'

    function getFromLocalStorage(key: StorageKeys) {
        const valueString = localStorage.getItem(BASE_KEY + key);

        if (valueString) {
            return JSON.parse(valueString);
        }

        return;
    }

    function insertInLocalStorage(key: StorageKeys, value: any) {
        localStorage.setItem(BASE_KEY + key, JSON.stringify(value));
    }
    
    return {
        getFromLocalStorage,
        insertInLocalStorage
    }
}