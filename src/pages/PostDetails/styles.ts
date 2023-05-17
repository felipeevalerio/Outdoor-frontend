import styled from "styled-components";

export const PostDetailsContainer = styled.main`
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
    gap: 2rem;

    > button {
        max-width: 80px;
    }
`

export const PostDetailsHeader = styled.header `
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    h1 {
        font-size: 2rem;
    }
`

export const PostDetailsMainContent = styled.article`
    display: flex;
    gap: 1rem;

    img {
        width: 55%;
        object-fit: cover;
        border-radius: 8px;
    }
`

export const PostDetailsInfo = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;    

    em {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        span:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
            margin-left: 4rem;

            img {
                height: 32px;
                border-radius: 50%;
                width: 32px;
                object-fit: cover;
            }   
        }

        strong {
            display: flex;
            align-items: center;
            gap: 0.2rem;
        }
    }

`

export const CommentSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    
    ul {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 1rem 0 ;
    }

    button {
        max-width: 220px;
        align-self: flex-end;
    }
`