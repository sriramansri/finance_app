import axios from "axios";

const instance=axios.create({
    baseURL:'http://localhost:5000/api',
});

    instance.interceptors.request.use((Config)=>{
        const token = localStorage.getItem('token')

        if (token) {
            Config.headers.Authorization=`Bearer ${token}`;
        }
        return Config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default instance;