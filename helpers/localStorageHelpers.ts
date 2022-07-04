export const lsHelpers = {
    saveItem(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get(key: string) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },

    remove(key: string) {
        localStorage.removeItem(key);
    },
};
