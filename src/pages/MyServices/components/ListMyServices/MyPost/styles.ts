import styled from "styled-components";

export const MyPostContainer = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 320px;

    .image {
        object-fit: cover;
        border-radius: 8px;
        height: 218px;
    }
`

export const MyPostInfo = styled.div`
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
export const MyPostActionsAndRating = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const MyPostActions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`