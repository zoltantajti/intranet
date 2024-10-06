const MyStorage = {
    local : {
        get(key){
            return JSON.parse(localStorage.getItem(`intranet/storage/${key}`) || null);
        },
        put(key,value){
            return localStorage.setItem(`intranet/storage/${key}`, JSON.stringify(value));
        },
        remove(key){
            return localStorage.removeItem(`intranet/storage/${key}`);
        }
    },
    session : {
        get(key){
            return JSON.parse(sessionStorage.getItem(`intranet/storage/${key}`) || null);
        },
        put(key,value){
            return sessionStorage.setItem(`intranet/storage/${key}`, JSON.stringify(value));
        },
        remove(key){
            return sessionStorage.removeItem(`intranet/storage/${key}`);
        }
    }
}

export default MyStorage;