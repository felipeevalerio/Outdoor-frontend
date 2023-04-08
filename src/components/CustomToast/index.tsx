import * as Toast from '@radix-ui/react-toast';
import { Root, Viewport } from './styles';

interface ICustomToastProps {
    variant: 'sucess' | 'error'
    message: string
}

export function CustomToast({ message, variant }: ICustomToastProps) {
    return (
        <>
            <Root variant={variant}>
                <Toast.Title>{message}</Toast.Title>
            </Root>
            <Viewport />
        </>
    )
}