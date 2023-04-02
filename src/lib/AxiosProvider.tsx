import axios, { AxiosError, AxiosResponse } from "axios";
import { ReactNode, useEffect } from "react";

export const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_BASE_URL
});

interface AxiosProviderProps {
    children: ReactNode;
}

interface Response {
    data: any;
    statusCode: number;
}

interface ErrorResponse  extends Response {
    message: string;
}

export function AxiosProvider({children}: AxiosProviderProps) {
    function tratarResposta(config: AxiosResponse) {
        const respostaAxios: Response = {
            data: config.data,
            statusCode: config.status
        }

        return respostaAxios;
    }

    useEffect(() => {
        const responseInterceptor = axiosInstance.interceptors.response.use((config) => tratarResposta(config), (err) =>console.error(err))
        
        return () => {
            axiosInstance.interceptors.response.eject(responseInterceptor);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AxiosProvider>
            {children}
        </AxiosProvider>
    )
}