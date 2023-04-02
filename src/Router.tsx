import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Contacts } from "./pages/Contacts";
import { Home } from "./pages/Home";
import { LoginModal } from "./pages/LoginModal";
import { Services } from "./pages/Services";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginModal/>}/>
                <Route path="/servicos" element={<Services/>}/>
                <Route path="/contatos" element={<Contacts/>}/>
            </Route>
        </Routes>
    )
}