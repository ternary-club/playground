import axios from 'axios';

const api = axios.create({
  baseURL:
    /* 'https://playground-backend-mock.herokuapp.com' */ 'http://445d-191-223-168-78.ngrok.io',
});

export { api };
