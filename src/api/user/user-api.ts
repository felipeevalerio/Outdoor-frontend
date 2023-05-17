import { axiosInstance } from "../../contexts/AxiosContext";
import { UserEditRequest } from "../../hooks/useUser";
import { LoginRequest, LoginResponse } from "./models/LoginModel";
import { RegisterRequest } from "./models/RegisterModel";
import { UserModel } from "./models/UserModel";

export async function Login(request: LoginRequest): Promise<LoginResponse>{
    const resposta = await axiosInstance.post('/users/login', request);
    return resposta.data; 
}

export async function Register(request: RegisterRequest): Promise<UserModel>{
    const resposta = await axiosInstance.post('/users', request);
    return resposta.data; 
}

export async function EditUser(request: UserEditRequest): Promise<UserModel>{
    const resposta = await axiosInstance.put(`/users`, request);
    return resposta.data; 
}