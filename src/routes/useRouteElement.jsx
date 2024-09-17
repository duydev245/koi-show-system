import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { PATH } from './path'
import { UserLayout } from '../layouts/UserLayout'
import { HomePage } from '../modules/User/Home'
import { useSelector } from 'react-redux'
import { AuthLayout } from '../layouts/AuthLayout'
import { LoginPage } from '../modules/Auth/Login'
import { RegisterForm } from '../modules/Auth/Register'
import { ProfilePage } from '../modules/User/ProfilePage'
import { KoiShowDetails } from '../modules/User/KoiShowDetails'


const ProtectedUserRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser) {
        return <Navigate to={PATH.LOGIN} />;
    }

    if (currentUser.role === 'ADMIN') {
        return <Navigate to={PATH.ADMIN} />;
    }

    if (currentUser.role === 'USER') {
        return (
            <UserLayout>
                <ProfilePage />
            </UserLayout>
        );
    }

    // Fallback redirect if role is not 'ADMIN' or 'USER'
    return <Navigate to={PATH.HOME} />;
};

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
        // HOME PAGE
        {
            path: PATH.HOME,
            element:
                <UserLayout>
                    <HomePage />
                </UserLayout>,
        },
        // SHOW DETAILS
        {
            path: PATH.SHOW_DETAIL,
            element:
                <UserLayout>
                    <KoiShowDetails />
                </UserLayout>
        },
        // PROFILE PAGE
        {
            path: PATH.PROFILE,
            element: (
                <ProtectedUserRouter />
            )
        },
    ])

    return routes;
}

export default useRouteElement
