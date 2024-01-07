import axios from 'axios';

const ClientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1`,
});

export default ClientAxios;
