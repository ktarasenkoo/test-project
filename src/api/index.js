import axios from 'axios';

export const fetchData = () => axios.get(process.env.ENDPOINT_URL);
