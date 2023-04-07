import axios, { AxiosError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

export const axiosInstance = axios.create({
    baseURL: 'https://localhost:7221/api'
});

interface IAxiosContextTypes {
    
}

interface ResponseError {
    status: number;
    message: any;
}

export const AxiosContext = createContext({ } as IAxiosContextTypes);

interface IAxiosProviderProps {
    children: ReactNode;
}

export function AxiosProvider({ children }: IAxiosProviderProps) {
    const [isOcurredError, setIsOcurredError] = useState(false);
    
    function handleError(error: AxiosError) {
        if (error.response) {
            const { status, data } = error.response;
            
            const respostaAxios: ResponseError = {
                message: data,
                status: status
            };

            return respostaAxios;
        } 
        else {
            const respostaAxios: ResponseError = {
                message: error.message,
                status: 500 
            };

            console.log(respostaAxios);

            return respostaAxios;
        }
    }

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use((config) => config, handleError)
        
        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor)
        }
    }, [])
    
    return (
        <AxiosContext.Provider value={{}}>
            {children}
        </AxiosContext.Provider>
    )
}