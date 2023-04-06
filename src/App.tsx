import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Router } from "./Router";
import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";
import { UserProvider } from "./contexts/UserContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { PostsProvider } from "./contexts/PostsContext";

export function App() { 
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <LoadingProvider>
        <UserProvider>
          <PostsProvider>
            <Router />
          </PostsProvider>
        </UserProvider>
        </LoadingProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}