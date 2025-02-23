import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || window._env_.REACT_APP_API_URL;
console.log('API_URL:', API_URL);
export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task) => axios.post(`${API_URL}/add`, task);
export const getTaskById = (id) => axios.get(`${API_URL}/task/${id}`);
export const updateTaskById = (id, task) => axios.patch(`${API_URL}/update/${id}`, task);
export const deleteTaskById = (id) => axios.delete(`${API_URL}/delete/${id}`);
