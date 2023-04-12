import { Circle, CircleNotch } from "phosphor-react";
import { LoadingContainer, Spinner } from "./styles";

interface ILoadingProps {
    isLoading: boolean;
}

export function Loading({isLoading}: ILoadingProps) {
    return isLoading ? (
        <LoadingContainer>
            <Spinner size={64} />
        </LoadingContainer>
    ) : <></>
}