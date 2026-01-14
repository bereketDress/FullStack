
// this folder API calls to backend for Employee Management System over HTTP requests

import axios from "axios";

const EMP_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployees = () => {
    return axios.get(EMP_API_BASE_URL);
}

export const createEmployee = (employee) => {
    return axios.post(EMP_API_BASE_URL, employee);
}

export const getEmployeeById = (id) => {
    return axios.get(`${EMP_API_BASE_URL}/${id}`);
}

export const updateEmployee = (id, employee) => {
    return axios.put(`${EMP_API_BASE_URL}/${id}`, employee);
}

export const deleteEmployee = (id) => {
    return axios.delete(`${EMP_API_BASE_URL}/${id}`);
}