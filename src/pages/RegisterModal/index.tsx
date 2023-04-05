import { Button } from "../../components/Button";
import { Title } from "../../components/Form/styles";
import { Input } from "../../components/Input";
import { ButtonsContainer, FormContent, InputsContainer, RegisterForm } from "./styles";
import { useUser } from "../../hooks/useUser";

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from "react-hook-form";
import { ModalCategory } from "../../components/Header";
import { CustomSelect, ISelectOptions } from "../../components/CustomSelect";

const registerUserSchema = z.object({
    userType: z.enum(['client','provider']),
    email: z.string().email(),
    name: z.string().min(1),
    password: z.string().min(1)
})

type RegisterUserFormInput = z.infer<typeof registerUserSchema>;

interface IRegisterModal {
    setCurrentModal: (currentModal: ModalCategory) => void;
}

const items: ISelectOptions[] = [
    {
        title: 'Cliente',
        value: 'client'
    },
    {
        title: 'Prestador de serviços',
        value: 'provider'
    },
]

export function RegisterModal({ setCurrentModal }: IRegisterModal) {
    const { registerUser } = useUser();
    const { register, handleSubmit, formState: { isSubmitting }, control } = useForm<RegisterUserFormInput>({
        resolver: zodResolver(registerUserSchema)
    });

    async function handleRegister(data: RegisterUserFormInput) {
        registerUser(data);
    }

    function handleChangeToLogin() {
        setCurrentModal(ModalCategory.Login);
    }

    return (
        <RegisterForm onSubmit={handleSubmit(handleRegister)}>
            <Title>Cadastrar</Title>
            <FormContent>
                <InputsContainer>
                    <CustomSelect 
                        control={control} 
                        controllerName={"userType"} 
                        items={items}
                    />
                    <Input 
                        id="name" 
                        type="text"
                        placeholder="Nome"
                        register={register}
                    />
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
                <ButtonsContainer>
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Cadastrar
                    </Button>
                    <strong>OU</strong>
                    <button 
                        type="button"
                        className="register-button"
                        onClick={handleChangeToLogin}
                    >
                        Entrar
                    </button>
                </ButtonsContainer>
            </FormContent>
        </RegisterForm>
    )
}