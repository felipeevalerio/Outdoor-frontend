import styled from "styled-components";

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 8rem;

    strong {
        font-size: 1.5rem;
        margin-top: 1rem;
    }
    
    img {
        height: 64px;
        object-fit: cover;
        width: 64px;
        border: 1px solid ${props => props.theme["gray-500"]};
    }
    
    button {
        margin-top: 1rem;
    }
`