import {createBrowserRouter} from "react-router-dom";
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import {Profile} from "./Profile/Profile";
import {Track} from "./Track/Track";
import {OnlyUnauthorized} from "../components/OnlyUnauthorized/OnlyUnauthorized";
import {OnlyAuthorized} from "../components/OnlyAuthorized/OnlyAuthorized";


export const router = createBrowserRouter([
    {
        path: "/login",
        element: <OnlyUnauthorized><Login /></OnlyUnauthorized>,
    },
    {
        path: "/auth",
        element: <OnlyUnauthorized><Register /></OnlyUnauthorized>,
    },
    {
        path: "/profile",
        element: <OnlyAuthorized><Profile/></OnlyAuthorized>,
    },
    {
        path: "/track",
        element: <OnlyAuthorized><Track /></OnlyAuthorized>,
    },
]);