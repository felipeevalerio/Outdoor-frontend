import { useContext } from "react";
import { LoginRequest } from "../api/user/models/LoginModel";
import { EditUser, Login, Register } from '../api/user/user-api';
import { UserContext } from "../contexts/UserContext";
import { RegisterRequest } from "../api/user/models/RegisterModel";
import { StorageKeys, useStorage } from "./useStorage";

export interface UserEditRequest {
    name: string;
    email: string;
    avatar: any;
    id: string;
}

export function useUser() {
    const { user, handleChangeUser } = useContext(UserContext);

    const { removeFromLocalStorage } = useStorage();

    async function loginUser(request: LoginRequest) {
        const response = await Login(request);

        if (response) {
            handleChangeUser(response);
        }
    }

    async function editUser(request: UserEditRequest) {
        const response = await EditUser(request);

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
        user,
        editUser,
        registerUser,
        logoutUser
    }
}