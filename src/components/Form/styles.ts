import styled from "styled-components";

import * as Dialog from '@radix-ui/react-dialog';

export const Overlay = styled(Dialog.DialogOverlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;

  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const Content = styled(Dialog.Content)`
  min-width: 40rem;
  border-radius: 8px;
  background: ${(props) => props.theme.white};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    align-items: center;
    width: 100%;
    position: relative;
  }
`;

export const Title = styled(Dialog.Title)`
  background-color: ${props => props.theme["purple-500"]};
  border-radius: 8px 8px 0 0;
  width: 100%;
  text-align: center;
  color: ${props => props.theme.white};
  padding: 1rem 0;
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 0.5rem;
  right: 1rem;
  line-height: 0;
  cursor: pointer;
  color: ${props => props.theme.white};
`

export const ErrorMessage = styled.span`
  color: red;
`