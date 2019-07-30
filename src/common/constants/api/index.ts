import axios from 'axios';

// `API config
export const API_KEY = "219218fcc72cafcebc22abf1d1488647"

export let API_V1 = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  responseType: 'json'
});

API_V1.interceptors.response.use((response) => {
  return {
    ...response,
    data: response.data,
  };
 }, (error) => {
  return Promise.reject(error.response);
 });