import axios from 'axios';

const backendBaseUrl = 'http://localhost:8000'; // Replace with your backend base URL

const instance = axios.create({
  baseURL: backendBaseUrl,
});

export default instance;
