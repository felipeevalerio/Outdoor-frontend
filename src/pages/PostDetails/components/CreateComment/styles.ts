import styled from "styled-components";

export const CreateCommentContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid ${props => props.theme["purple-500"]};
    padding: 1rem;
    align-items: center;
    gap: 1rem;

    textarea {
        width: 100%;
    }
`

export const RatingStarContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`