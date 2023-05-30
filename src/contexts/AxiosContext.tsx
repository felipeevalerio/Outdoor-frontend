import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { CustomToast } from "../components/CustomToast";
import { LoadingContext } from './LoadingContext'; 

export const axiosBackendInstance = axios.create({
    baseURL: 'https://outdoorbackend.azurewebsites.net/api'
})

export const axiosBaseInstance = axios.create();

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
    const [errorMessage, setErrorMessage] = useState('');
    const { handleLoadingVisibility } = useContext(LoadingContext)

    function handleError(error: AxiosError) {
        if (error.response) {
            const { status, data } = error.response;
            
            const respostaAxios: ResponseError = {
                message: data,
                status: status
            };
            handleLoadingVisibility(false)
            showToast(respostaAxios.message.mensagem)
            return respostaAxios;
        } 
        else {
            const respostaAxios: ResponseError = {
                message: error.message,
                status: 500 
            };
            handleLoadingVisibility(false)
            showToast(respostaAxios.message)
            return respostaAxios;
        }
    }

    function handleRequest(config: InternalAxiosRequestConfig) {
        handleLoadingVisibility(true);
        return config;
    }

    function handleResponse(config: AxiosResponse) {
        handleLoadingVisibility(false);
        return config;
    }

    useEffect(() => {
        const requestBackendInterceptor = axiosBackendInstance.interceptors.request.use((config) => handleRequest(config), handleError)
        const responseBackendInterceptor = axiosBackendInstance.interceptors.response.use((config) => handleResponse(config), handleError)
        
        const requestBaseInterceptor = axiosBaseInstance.interceptors.request.use((config) => handleRequest(config), handleError)
        const responseBaseInterceptor = axiosBaseInstance.interceptors.response.use((config) => handleResponse(config), handleError)
        
        return () => {
            axiosBackendInstance.interceptors.request.eject(requestBackendInterceptor)
            axiosBackendInstance.interceptors.response.eject(responseBackendInterceptor)

            axiosBaseInstance.interceptors.request.eject(requestBaseInterceptor)
            axiosBaseInstance.interceptors.response.eject(responseBaseInterceptor)
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