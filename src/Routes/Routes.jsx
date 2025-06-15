import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import AllFoods from '../Pages/Foods/AllFoods';
import ErrorPage from '../Pages/ErrorPage';
import FoodDetails from '../Pages/Foods/FoodDetails';
import Gallery from '../Pages/Gallery';
import FoodPurchase from '../Pages/FoodPurchase/FoodPurchase';
import PrivateRoute from './PrivateRoute';
import AddFood from '../Pages/AddFood/AddFood';
import MyFoods from '../Pages/MyFoods/MyFoods';
import UpdateFood from '../Pages/MyFoods/UpdateFood';
import MyOrders from '../Pages/MyOrders/MyOrders';
import Unauthorized from '../Pages/ErrorPages/Unauthorized';
import Forbidden from '../Pages/ErrorPages/Forbidden';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
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
                element: <AllFoods />,
            },
            {
                path: 'food/:id',
                element: <FoodDetails />,
            },
            {
                path: 'gallery',
                element: <Gallery />,
            },
            {
                path: 'food/purchase/:id',
                element: (
                    <PrivateRoute>
                        <FoodPurchase />
                    </PrivateRoute>
                ),
            },
            {
                path: 'add-food',
                element: (
                    <PrivateRoute>
                        <AddFood />
                    </PrivateRoute>
                ),
            },
            {
                path: 'my-foods',
                element: (
                    <PrivateRoute>
                        <MyFoods />
                    </PrivateRoute>
                ),
            },
            {
                path: 'update-food/:id',
                element: (
                    <PrivateRoute>
                        <UpdateFood />
                    </PrivateRoute>
                ),
            },
            {
                path: 'my-orders',
                element: (
                    <PrivateRoute>
                        <MyOrders />
                    </PrivateRoute>
                ),
            },
            {
                path: 'unauthorized',
                element: <Unauthorized />,
            },
            {
                path: 'forbidden',
                element: <Forbidden />,
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
]);

export default router;