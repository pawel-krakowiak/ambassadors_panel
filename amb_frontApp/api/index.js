import axios from 'axios'
const API = axios.create({baseURL: 'https://web-production-f464.up.railway.app/api'})

///User
export const logIn = (formData) => API.post(`/auth/login/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
export const verifyToken = (formData, accesToken) => API.post(`/auth/refresh/`, formData, {headers: {'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accesToken}` }})
export const getUserInfo = (accesToken) => API.get(`/users/get_user_info/`, {headers: {'Authorization': `Bearer ${accesToken}` }})

///Products
export const getProducts = (accesToken) => API.get(`/rewards/`, {headers: {'Authorization': `Bearer ${accesToken}` }})

///Orders
export const createOrder = (accesToken) => API.post(`/orders/save`, {headers: {'Authorization': `Bearer ${accesToken}` }})
