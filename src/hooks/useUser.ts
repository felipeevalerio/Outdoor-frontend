import { useContext } from "react";
import { LoginRequest } from "../api/user/models/LoginModel";
import { Login, Register } from '../api/user/user-api';
import { UserContext } from "../contexts/UserContext";
import { RegisterRequest } from "../api/user/models/RegisterModel";
import { StorageKeys, useStorage } from "./useStorage";

export function useUser() {
    const { handleChangeUser } = useContext(UserContext);
    const { removeFromLocalStorage } = useStorage();

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

    async function logoutUser() {
        removeFromLocalStorage(StorageKeys.Users)
        handleChangeUser(null);
    }

    return {
        loginUser,
        registerUser,
        logoutUser
    }
}