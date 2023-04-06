import { Link } from "react-router-dom";
import styled from "styled-components";

export const PostContainer = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 320px;

    .image {
        object-fit: cover;
        border-radius: 8px;
    }
`

export const PostInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h2 {
        font-size: 2rem;
    }

    .description {
        font-size: 1rem;
    }
`

export const UserInfo = styled.div`
    margin: 0.5rem 0;
    display: flex;
    justify-content: space-between;

    .user-details { 
        display: flex;
        align-items: center;
        gap: 1rem;
    
        img {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: relative;
            object-fit: cover;
        }
    }
`

export const PostActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .favorite-button {
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
`

export const HireButton = styled.button`
    text-align: center;
    color: ${props => props.theme.white};
    background-color: ${props => props.theme["green-500"]};
    padding: 0.5rem 1rem; 
    cursor: pointer;
    border: 0;
    border-radius: 4px;
`