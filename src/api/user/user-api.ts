import { axios } from "../../lib/axios";
import { LoginRequest, LoginResponse } from "./models/LoginModel";

export async function Login(request: LoginRequest): Promise<LoginResponse>{
    return {
        avatar: 'https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg',
        createdAt: new Date().toISOString(),
        email: 'felipe@teste.com',
        id: '123',
        name: 'Felipe',
        password: '123',
        userType: 'client'
    } as LoginResponse;

    // const resposta = await axios.post('/login', request);
    // return resposta.data; 
}