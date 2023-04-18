import axios from 'axios'
const API = axios.create({baseURL: 'https://web-production-f464.up.railway.app/api'})

export const logIn = (data) => API.post(`/auth/login/`, data)