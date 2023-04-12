import styled from "styled-components";

export const ListServicesContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    gap: 7rem;
    margin-top: 2rem;
`

export const PostNotFoundMessage = styled.span`
    display: flex;
    justify-content: center;
    margin: 5rem auto;
    background-color: ${props => props.theme["gray-300"]};
    padding: 1rem;
    border-radius: 4px;
    color: ${props => props.theme["purple-500"]};
    font-weight: 700;
`