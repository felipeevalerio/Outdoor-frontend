import styled, { css } from "styled-components";

interface IButtonContainerProps {
    variant: 'purple' | 'green'
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
    text-align: center;
    padding: 1rem;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s;
    font-weight: bold;

    ${props => props.variant === 'purple' && css`
        background-color: ${props.theme["purple-500"]};
        color: ${props.theme.white};

        &:hover {
            background-color: ${props.theme["purple-300"]};
        }
    `}

    ${props => props.variant === 'green' && css`
        background-color: ${props.theme["green-500"]};
        color: ${props.theme.white};

        &:hover {
            background-color: ${props.theme["green-300"]}
        }
    `}
`