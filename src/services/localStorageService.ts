class localStorageService {

    static has(key: string) {
        return localStorage.hasOwnProperty(key)
    }

    static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key: string) {
        return JSON.parse(localStorage.getItem(key) ?? 'null');
    }

    static remove(key: string) {
        localStorage.removeItem(key);
    }
}

export default localStorageService