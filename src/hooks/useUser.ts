import { useContext } from "react";
import { LoginRequest } from "../api/user/models/LoginModel";
import { Login } from '../api/user/user-api';
import { UserContext } from "../contexts/UserContext";

export function useUser() {
    const { handleChangeUser } = useContext(UserContext);

    async function loginUser(request: LoginRequest) {
        const response = await Login(request);

        if (response) {
            handleChangeUser(response);
        }
    }

    return {
        loginUser
    }
}