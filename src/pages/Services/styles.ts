import styled from "styled-components";

export const ServicesContainer = styled.main`
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
`

export const ServicesActions = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .selects-container {
        display: flex;
        gap: 1.5rem;
    }

    button {
        max-width: 240px;
    }
`

export const Select = styled.select`
    border: 1px solid ${props => props.theme["gray-500"]};
    border-radius: 4px;
    padding: 0.75rem 1rem;
    min-width: 160px;
`
