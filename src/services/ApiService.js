import axios from "axios";

let ApiService = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: false,
    Authorization: "Bearer "+ localStorage.getItem('token')
});

export default ApiService;
