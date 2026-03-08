import axios from "axios";
import { Employee, Department, Project } from "./types"; 

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/", 
});

export const getEmployee = async (): Promise<Employee[]> => {
    const response = await API.get<Employee[]>("employees/");   
    return response.data;
};

// CREATE
export const createEmployee = async (data: Partial<Employee>): Promise<Employee> => {
    const response = await API.post<Employee>("employees/", data);
    return response.data;
};

// UPDATE
export const updateEmployee = async (Employee_ID: number, data: Partial<Employee>): Promise<Employee> => {
    const response = await API.patch<Employee>(`employees/${Employee_ID}/`, data); 
    return response.data;
};

// DELETE
export const deleteEmployee = async (Employee_ID: number): Promise<void> => {
    await API.delete(`employees/${Employee_ID}/`);
};

// Departments
export const getDepartments = async (): Promise<Department[]> => (await API.get("departments/")).data;
export const createDepartment = async (data: any): Promise<Department> => (await API.post("departments/", data)).data;

// Projects
export const getProjects = async (): Promise<Project[]> => (await API.get("projects/")).data;
export const createProject = async (data: any): Promise<Project> => (await API.post("projects/", data)).data;