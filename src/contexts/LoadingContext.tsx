import { ReactNode, createContext, useState } from 'react';
import { Loading } from '../components/Loading';

interface ILoadingContextType {
    isLoading: boolean;
    handleLoadingVisibility: (isVisible: boolean) => void;
}

export const LoadingContext = createContext({} as ILoadingContextType);

interface ILoadingProviderProps {
    children: ReactNode;
}

export function LoadingProvider({ children }: ILoadingProviderProps) {
    const [isLoading, setIsLoading] = useState(false);
    
    function handleLoadingVisibility(isVisible: boolean) {
        setIsLoading(isVisible);
    } 

    return (
        <LoadingContext.Provider value={{isLoading, handleLoadingVisibility}}>
            <Loading isLoading={isLoading}/>
            {children}
        </LoadingContext.Provider>
    )
}