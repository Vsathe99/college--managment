import axios from 'axios';

const asiosInsatamce = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})

export default asiosInsatamce;