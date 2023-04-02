import { Link } from "react-router-dom";
import styled from "styled-components";

export const LogoContainer = styled(Link)`
    text-decoration: none;
    width: 164px;
    
    h1 {
        color: ${props => props.theme["purple-500"]};
        font-style: italic;
        font-weight: bold;
    }
`
