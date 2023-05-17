import axios, { AxiosError } from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";
import { CustomToast } from "../components/CustomToast";

export const axiosInstance = axios.create({
    baseURL: 'https://outdoorbackend.azurewebsites.net/api'
})

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
    const [errorMessage, setErrorMessage] = useState('');

    function handleError(error: AxiosError) {
        if (error.response) {
            const { status, data } = error.response;
            
            const respostaAxios: ResponseError = {
                message: data,
                status: status
            };

            showToast(respostaAxios.message.mensagem)
            return respostaAxios;
        } 
        else {
            const respostaAxios: ResponseError = {
                message: error.message,
                status: 500 
            };

            showToast(respostaAxios.message)
            return respostaAxios;
        }
    }

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use((config) => config, handleError)
        
        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor)
        }
    }, [])

    function showToast(message: string) {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage('');
        },4000)
    }
     
    return (
        <AxiosContext.Provider value={{}}>
            {errorMessage !== '' && <CustomToast variant={"error"} message={errorMessage}/>}
            {children}
        </AxiosContext.Provider>
    )
}