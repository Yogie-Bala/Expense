import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../pages/Auth/login';
import SignUp from '../pages/Auth/signin';
import MainLayout from '../layout/MainLayout';

const AuthenticationRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            index: true,
            element: <Navigate to="/pages/login" replace />
        },
        {
            path: 'pages/login',
            element: <Login />
        },
        {
            path: 'pages/signUp',
            element: <SignUp />
        }
    ]
};

export default AuthenticationRoutes;
