import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://auto-tindr.herokuapp.com',
  withCredentials: true,
});

export default instance;
