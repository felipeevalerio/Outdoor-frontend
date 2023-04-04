import { axios } from "../../lib/axios";
import { LoginRequest, LoginResponse } from "./models/LoginModel";

export async function Login(request: LoginRequest): Promise<LoginResponse>{
    const resposta = await axios.post('/users/login', request);
    return resposta.data; 
}