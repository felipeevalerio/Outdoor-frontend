import { axiosBackendInstance } from "../../contexts/AxiosContext";
import { UserEditRequest } from "../../hooks/useUser";
import { LoginRequest, LoginResponse } from "./models/LoginModel";
import { RegisterRequest } from "./models/RegisterModel";
import { UserModel } from "./models/UserModel";

export async function Login(request: LoginRequest): Promise<LoginResponse>{
    const resposta = await axiosBackendInstance.post('/users/login', request);
    return resposta.data; 
}

export async function Register(request: RegisterRequest): Promise<UserModel>{
    const resposta = await axiosBackendInstance.post('/users', request);
    return resposta.data; 
}

export async function EditUser(request: UserEditRequest): Promise<UserModel>{
    const resposta = await axiosBackendInstance.put(`/users`, request);
    return resposta.data; 
}