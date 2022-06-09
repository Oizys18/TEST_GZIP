import axios from 'axios';

const HOSTNAME = 'https://api.themoviedb.org/3';

export const base = axios.create({
  baseURL: HOSTNAME,
  withCredentials: true,
});
