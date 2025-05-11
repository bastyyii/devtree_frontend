import { isAxiosError } from "axios";
import api from "./axios";
import { User, UserHandle } from "../types/user";

export const getUser = async () =>{
    try {
        const { data } = await api<User>('/getuser');
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}

export const getUserByHandle = async (handle: string) =>{
    try {
        const { data } = await api.get<UserHandle>(`/users/${handle}`);
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error);
        }
    }
}