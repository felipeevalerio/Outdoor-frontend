import styled from "styled-components";
import { Form } from "../../../../components/Form";

export const EditPostModalContainer = styled(Form)`
`

export const InputsCreatePostContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 420px;
    margin: -2rem -4rem 1rem;
    row-gap: 0.5rem;
    column-gap: 1rem;

    input:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`