import { CircleNotch } from "phosphor-react";
import styled from "styled-components";

export const LoadingContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Spinner = styled(CircleNotch)`
    @keyframes spin {
        0%{ -webkit-transform: rotate(0deg); transform: rotate(0deg);}
	    100%{ -webkit-transform: rotate(360deg); transform: rotate(360deg);}
    }
    
    color: ${props => props.theme["purple-500"]};
    animation: spin 1s linear infinite;
`

