import {createBrowserRouter} from "react-router-dom";
import {Login} from "./Login/Login";
import {Register} from "./Register/Register";
import {Profile} from "./Profile/Profile";
import {Track} from "./Track/Track";
import {OnlyUnauthorized} from "../components/OnlyUnauthorized/OnlyUnauthorized";
import {OnlyAuthorized} from "../components/OnlyAuthorized/OnlyAuthorized";
import {TrackCreate} from "./Track/create/TrackCreate";
import {SuccessReg} from "./SuccessReg/SuccessReg";
import {ChangeProfile} from "./Profile/Change/Change";
import {TrackUpdate} from "./Track/Update/TrackUpdate";
import {News} from "./News/News";


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
        path: "/auth/success",
        element: <SuccessReg />,
    },
    {
        path: "/profile",
        element: <OnlyAuthorized><Profile/></OnlyAuthorized>,
    },
    {
        path: "/profile/change",
        element: <OnlyAuthorized><ChangeProfile/></OnlyAuthorized>,
    },
    {
        path: "/track/:id",
        element: <OnlyAuthorized><Track /></OnlyAuthorized>,
    },
    {
        path: '/track/create',
        element: <OnlyAuthorized><TrackCreate /></OnlyAuthorized>,
    },
    {
        path: '/track/update/:id',
        element: <OnlyAuthorized><TrackUpdate /></OnlyAuthorized>,
    },
    {
        path: '/news',
        element: <News />,
    }
]);