import { ReactNode, createContext, useEffect, useState } from 'react';
import { UserModel } from '../api/user/models/UserModel';
import { StorageKeys, useStorage } from '../hooks/useStorage';

interface UserContextType {
    user: UserModel | null;
    handleChangeUser: (user: UserModel) => void;
}

export const UserContext = createContext({} as UserContextType);

interface IUserProviderProps {
    children: ReactNode;
}

export function UserProvider({children}: IUserProviderProps) {
    const [user, setUser] = useState<UserModel | null>(null);
    const { getFromLocalStorage, insertInLocalStorage } = useStorage();

    useEffect(() => {
        const userFound = getFromLocalStorage(StorageKeys.Users);
        setUser(userFound);
    }, []);

    function handleChangeUser(user: UserModel) {
        insertInLocalStorage(StorageKeys.Users, user);
        setUser(user);
    }

    return (
        <UserContext.Provider value={{user, handleChangeUser}}>
            {children}
        </UserContext.Provider>
    );
}