import axios from "axios";

const instance = axios.create({
    baseURL: 'https://localhost:7221/api'
});

export { instance as axios }