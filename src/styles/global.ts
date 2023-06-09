import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :focus {
        outline: none;
        box-shadow: 0 0 0 2px ${props => props.theme['purple-500']};
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-size: 1rem;
        font-weight: 400;
        font-family: 'Raleway', sans-serif;
        color: ${props => props.theme.text};
    } 

    button:disabled {
        background-color: ${props => props.theme['gray-300']};
        pointer-events: none;
    }
`