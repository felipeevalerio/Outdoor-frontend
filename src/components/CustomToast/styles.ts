import * as Toast  from "@radix-ui/react-toast";
import styled from "styled-components";

export const Viewport = styled(Toast.Viewport)`
    --viewport-padding: 25px;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: var(--viewport-padding);
    gap: 10px;
    width: 390px;
    max-width: 100vw;
    margin: 0;
    list-style: none;
    z-index: 2147483647;
    outline: none;
`   
  
interface IRootProps {
  variant: 'sucess' | 'error'
}

export const Root = styled(Toast.Root)<IRootProps>`
    background-color: ${props => props.variant === 'error' ? props.theme["red-500"] : props.theme["green-500"]};
    color: ${props => props.theme.white};
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    padding: 16px;
    align-items: center;

    &[data-state='open'] {
    animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    &[data-state='closed'] {
        animation: hide 100ms ease-in;
    }
    &[data-swipe='move'] {
        transform: translateX(var(--radix-toast-swipe-move-x));
    }
    &[data-swipe='cancel'] {
        transform: translateX(0);
        transition: transform 200ms ease-out;
    }

    &[data-swipe='end'] {
    animation: swipeOut 100ms ease-out;

    @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
    to {
      transform: translateX(0);
    }
  }
  
  @keyframes swipeOut {
    from {
      transform: translateX(var(--radix-toast-swipe-end-x));
    }
    to {
      transform: translateX(calc(100% + var(--viewport-padding)));
    }
  }
}
`

