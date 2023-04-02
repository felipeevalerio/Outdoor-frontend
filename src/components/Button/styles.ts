import styled, { css } from "styled-components";

interface IButtonContainerProps {
    variant: 'purple'
}

export const ButtonContainer = styled.button<IButtonContainerProps>`
    text-align: center;
    padding: 1rem 2rem;
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.2s;

    ${props => props.variant === 'purple' && css`
        background-color: ${props.theme["purple-500"]};
        color: ${props.theme.white};

        &:hover {
            background-color: ${props.theme["purple-300"]};
        }
    `}
`