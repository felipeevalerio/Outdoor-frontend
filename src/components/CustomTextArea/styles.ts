import styled from "styled-components";

export const CustomTextAreaContainer = styled.textarea`
    resize: none;
    border: 1px solid ${props => props.theme["gray-500"]};
    border-radius: 4px;
    padding: 0.75rem 1rem;

    &::placeholder {
        color: ${props => props.theme["gray-500"]};
    }
`