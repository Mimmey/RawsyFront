import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {router} from "./pages";
import {RouterProvider} from "react-router-dom";
import {Provider, useDispatch} from "react-redux";
import {store} from "./store";
import {getCurrentUserInfo} from "./api/getCurrentUserInfo";
import {setUserData} from "./store/user.slice";


const WithUser = () => {
    const [isLoadingUserData, setIsLoadingUserData] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!window.localStorage.getItem('token')?.length) return setIsLoadingUserData(false);
        getCurrentUserInfo()
            .then((data => {
                if (data) {
                    dispatch(setUserData(data));
                }
            }))
            .finally(() => setIsLoadingUserData(false))
    })

    if (isLoadingUserData) return null;
    return <RouterProvider router={router} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <WithUser />
    </Provider>
);
