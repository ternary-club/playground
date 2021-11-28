import axios from 'axios';

const api = axios.create({
  baseURL: 'https://playground-backend-mock.herokuapp.com',
});

export { api };
