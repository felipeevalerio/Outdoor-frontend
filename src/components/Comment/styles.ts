import styled from "styled-components";

export const CommentContainer = styled.li`
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    gap: 0.5rem;
    background-color: ${props => props.theme["gray-300"]};
    border-radius: 8px;
    
    p {
        line-height: 1.5rem;
        color: #000;
    }

    img {
        height: 180px;
        width: 180px;
        object-fit: cover;
    }
`