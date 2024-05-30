import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getTasks = () => axios.get(`${API_URL}/tasks`);
export const createTask = (task) => axios.post(`${API_URL}/add`, task);
export const getTaskById = (id, task) => axios.patch(`${API_URL}/task/${id}`, task);
export const updateTaskById = (id, task) => axios.patch(`${API_URL}/update/${id}`, task);
export const deleteTaskById = (id) => axios.delete(`${API_URL}/delete/${id}`);
