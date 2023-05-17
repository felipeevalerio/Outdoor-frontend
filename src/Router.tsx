import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { Contacts } from "./pages/Contacts";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { MyServices } from "./pages/MyServices";
import { Routes as AppRoutes} from './routes';
import { PostDetails } from "./pages/PostDetails";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route path={AppRoutes.Home} element={<Home/>}/>
                <Route path={AppRoutes.Services} element={<Services/>}/>
                <Route path={AppRoutes.ServiceDetails} element={<PostDetails/>}/>
                <Route path={AppRoutes.MyServices} element={<MyServices/>}/>
                <Route path={AppRoutes.Contacts} element={<Contacts/>}/>
            </Route>
        </Routes>
    )
}