import axios from 'axios'
const API = axios.create({baseURL: 'https://web-production-f464.up.railway.app/api'})

export const logIn = (formData) => API.post(`/auth/login/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})