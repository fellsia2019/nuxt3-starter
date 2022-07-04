export const ssHelpers = {
    saveItem(key: string, value: any) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    get(key: string) {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
};
