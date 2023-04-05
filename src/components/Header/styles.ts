import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
    padding: 0 1rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme["gray-300"]};
`;

export const LinksContainer = styled.nav`
    display: flex;
    gap: 0.5rem;
`

export const MainLinks = styled.ul`
    display: flex;
    align-items: center;
`

export const LinkButton = styled.button`
    padding: 1rem;
    transition: background-color 0.1s;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    height: 100%;
    min-width: 100px;

    &:hover {
        background-color: ${props => props.theme["purple-300"]};
    }
`

interface SignInSignUpButtonProps {
    userHaveAvatar: boolean;
}

export const SignInSignUpButton = styled.button<SignInSignUpButtonProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    
    margin: 0 1rem;
    border: 0;
        
    background-color: transparent;
    cursor: pointer;
    position: relative;
    max-width: 120px;
    color: ${props => props.theme["gray-500"]};
    padding-top: 0.5rem;

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        position: relative;
        object-fit: cover;
    }

    ${props => !props.userHaveAvatar && 
        css`
            img {
                width: 24px;
                height: 24px;
            }

            &::before {
            content: "";
            background-color: ${props => props.theme["gray-300"]};
            width: 36px;
            height: 36px;
            border-radius: 50%;
            position: absolute;
            top: 0.2rem;
            }
        `
    }

    span {
        font-size: 0.875rem;
    }

    .userMenu {
        display: none;
    }

    &:hover .userMenu {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        position: absolute;
        content: '';
        background: ${props => props.theme["gray-300"]};
        color: ${props => props.theme.text};
        top: 3.5rem;
        border-radius: 4px;
        border: 1px solid ${props => props.theme["gray-500"]};
        
        li {
            overflow: hidden;
            list-style: none;
            padding: 0.5rem 1rem;
            transition: all 0.1s ease;

            &:hover {
                background-color: ${props => props.theme["purple-300"]};
                color: ${props => props.theme.white};
            }
        }
    }
`