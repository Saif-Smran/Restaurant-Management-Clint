import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import AllFoods from '../Pages/Foods/AllFoods';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: 'auth/login',
                element: <Login />,
            },
            {
                path: 'auth/register',
                element: <Register />,
            },
            {
                path: 'foods',
                element: <AllFoods></AllFoods>
            }
        ]
    }
]);

export default router;