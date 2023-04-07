import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { PostsProvider } from "./contexts/PostsContext";
import { AxiosProvider } from "./contexts/AxiosContext";

export function App() { 
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      <AxiosProvider>
        <LoadingProvider>
        <UserProvider>
          <PostsProvider>
            <Router />
          </PostsProvider>
        </UserProvider>
        </LoadingProvider>
      </AxiosProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}