import axios from "axios";

const instance = axios.create({
    baseURL: process.env.BACKEND_BASE_URL
});

export { instance as axios }