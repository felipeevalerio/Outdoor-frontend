import styled from "styled-components";
import { Form } from "../../components/Form";
import { Logo } from "../../components/Logo";

export const LoginForm = styled(Form)`
`

export const FormContent = styled.section`
    display: flex;
    flex-direction: column;
    margin: 4rem 0;
    gap: 0.5rem;
    width: 70%;

    .forgot-password {
        background: transparent;
        border: 0;
        display: flex;
        align-self: flex-end;
        max-width: 180px;
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`

export const InputsContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    
`

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    margin-top: 1.5rem;
    gap: 1rem;

    .register-button {
        background: transparent;
        border: 0;
        font-weight: bold;
        color: ${props => props.theme["purple-500"]};
        cursor: pointer;
    }
`