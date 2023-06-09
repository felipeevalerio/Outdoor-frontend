import { Button } from "../../components/Button";
import { Title } from "../../components/Form/styles";
import { Input } from "../../components/Input";
import { ButtonsContainer, FormContent, InputsContainer, LoginForm } from "./styles";
import { useUser } from "../../hooks/useUser";

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from "react-hook-form";
import { ModalCategory } from "../../components/Header";

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1)
})

type LoginUserFormInputs = z.infer<typeof loginUserSchema>;

interface ILoginModalProps {
    setCurrentModal: (currentModal: ModalCategory) => void;
}

export function LoginModal({setCurrentModal}: ILoginModalProps) {
    const { loginUser } = useUser();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginUserFormInputs>({
        resolver: zodResolver(loginUserSchema)
    });

    function handleForgotPassword() {
        
    }

    async function handleLogin(data: LoginUserFormInputs) {
        loginUser(data);
    }

    function handleChangeToRegister() {
        setCurrentModal(ModalCategory.Register);
    }

    return (
        <LoginForm onSubmit={handleSubmit(handleLogin)}>
            <Title>Login</Title>
            <FormContent>
                <InputsContainer>
                    <Input 
                        id="email" 
                        type="email"
                        placeholder="Email"
                        register={register}
                    />
                    <Input 
                        id="password" 
                        type="password"
                        placeholder="Senha"
                        register={register}
                    />
                </InputsContainer>
                <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="forgot-password"
                >
                    Esqueci minha senha
                </button>

                <ButtonsContainer>
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Entrar
                    </Button>
                    <strong>OU</strong>
                    <button 
                        type="button"
                        className="register-button"
                        onClick={handleChangeToRegister}
                    >
                        Registrar
                    </button>
                </ButtonsContainer>
            </FormContent>
        </LoginForm>
    )
}