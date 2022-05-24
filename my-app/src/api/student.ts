import axios from "./axios";
import { StudentFormType } from "../components/StudentForm/StudentForm.type";

export const getStudents = () =>{
    return axios.get('/api/students')
}

export const getStudentbyId = (id:number) => {
    return axios.get(`/api/students/${id}`)
}

export const createStudent = (data:any) =>{
    return axios.post('/api/students/create',data)
}

export const updateStudent = (id:number, data:any)=>{
    return axios.post(`/api/students/update/${id}`,data)
}

export const deleteStudent = (id:number) =>{
    return axios.delete(`/api/students/delete/${id}`)
}

export const registerCreate = (data:any) =>{
    return axios.post('/api/register',data)
}

export const login = (data:any) =>{
    return axios.post('/api/login',data)
}

export const logout = ()=>{
    return axios.post('/api/logout');
}