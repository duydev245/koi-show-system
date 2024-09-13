import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { PATH } from './path'
import { UserLayout } from '../layouts/UserLayout'
import { HomePage } from '../modules/User/Home'
import { useSelector } from 'react-redux'
import { AuthLayout } from '../layouts/AuthLayout'
import { LoginPage } from '../modules/Auth/Login'
import { RegisterForm } from '../modules/Auth/Register'


const RejectedRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Outlet />;
    }

    return currentUser.role === "ADMIN" ? (
        <Navigate to={PATH.ADMIN} />
    ) : (
        <Navigate to={PATH.HOME} />
    );
};

const useRouteElement = () => {

    const routes = useRoutes([
        // HOME PAGE
        {
            path: PATH.HOME,
            element:
                <UserLayout>
                    <HomePage />
                </UserLayout>,
        },
        // AUTH 
        {
            path: PATH.AUTH,
            element: <RejectedRouter />,
            children: [
                {
                    index: true,
                    element: <Navigate to={PATH.LOGIN} />,
                },
                {
                    path: PATH.LOGIN,
                    element: (
                        <AuthLayout>
                            <LoginPage />
                        </AuthLayout>
                    )
                },
                {
                    path: PATH.REGISTER,
                    element: (
                        <AuthLayout>
                            <RegisterForm />
                        </AuthLayout>
                    )
                },
            ]

        },
    ])

    return routes;
}

export default useRouteElement
