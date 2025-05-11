import { isAxiosError } from "axios"
import { toast } from "sonner";
import { UseFormReset } from "react-hook-form";
import { LoginUser, RegisterUser, User } from "../types/user";
import api from "./axios";

export const postRegister = async (
    dataForm: RegisterUser,
    reset: UseFormReset<RegisterUser>
) =>{
    try {
        const { data } = await api.post(`/register`, dataForm);
        toast.success(data);
        reset()
    } catch (error) {
        if(isAxiosError(error) && error.response){
            toast(error.response.data.error)
        }
    }
}

export const postLogin = async (
    dataForm: LoginUser,
    // reset: UseFormReset<LoginUser>
) =>{
    try {
        const { data } = await api.post(`/login`, dataForm);
        localStorage.setItem('AUTH_TOKEN', data.token);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            toast(error.response.data.error)
        }
    }
}

export const updateUser = async (formData: User) =>{
    try {
        const { data } = await api.patch<string>('/patchuser', formData);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const uploadImage = async (file: File) =>{
    let formData = new FormData();
    formData.append('file', file);
    try {
        const { data: {image} } : {data: {image: string}} = await api.post('/postimage', formData);
        return image
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const searchHandle = async (handle: string) =>{
    try {
        const { data } = await api.post<string>('/search', {handle});
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}