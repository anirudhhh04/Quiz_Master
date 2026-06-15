import axios from "axios";
const api = axios.create({ baseURL: "https://quiz-master-vqap.onrender.com",});

export default api;   //for building api