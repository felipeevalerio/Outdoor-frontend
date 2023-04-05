import { useContext } from "react";
import { LoginRequest } from "../api/user/models/LoginModel";
import { Login, Register } from '../api/user/user-api';
import { UserContext } from "../contexts/UserContext";
import { RegisterRequest } from "../api/user/models/RegisterModel";

export function useUser() {
    const { handleChangeUser } = useContext(UserContext);

    async function loginUser(request: LoginRequest) {
        const response = await Login(request);

        if (response) {
            handleChangeUser(response);
        }
    }

    
    async function registerUser(request: RegisterRequest) {
        const response = await Register(request);

        if (response) {
            handleChangeUser(response);
        }
    }

    return {
        loginUser,
        registerUser
    }
}