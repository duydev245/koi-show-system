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
import { KoiDetails } from '../modules/User/KoiDetails'
import { AdminLayout } from '../layouts/AdminLayout'
import { ShowManagement } from '../modules/Admin/ShowManagement'
import { StaffManagement } from '../modules/Admin/StaffManagement'
import { StaffLayout } from '../layouts/StaffLayout'
import { MemberManagement } from '../modules/Staff/MemberManagement'
import { RefereeManagement } from '../modules/Staff/RefereeManagement'
import { AccountAdmin } from '../modules/Admin/AccountAdmin'

// Authen
const RejectedRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Outlet />;
    }

    if (currentUser.role === 'ADMIN') {
        return <Navigate to={PATH.ADMIN} />;
    }

    if (currentUser.role === 'STAFF') {
        return <Navigate to={PATH.STAFF} />;
    }

    return <Navigate to={PATH.HOME} />;
};

// Member Role -ProfilePage
const ProtectedUserRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser) {
        return <Navigate to={PATH.LOGIN} />;
    }

    if (currentUser.role === 'ADMIN') {
        return <Navigate to={PATH.ADMIN} />;
    }

    if (currentUser.role === 'STAFF') {
        return <Navigate to={PATH.STAFF} />;
    }

    if (currentUser.role === 'MEMBER') {
        return (
            <UserLayout>
                <ProfilePage />
            </UserLayout>
        );
    }

    return <Navigate to={PATH.HOME} />;
};

// Admin role
const ProtectedRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return currentUser.role === "ADMIN" ? (
        <Outlet />
    ) : (
        <Navigate to={PATH.HOME} />
    );
};

// Staff role
const ProtectedStaffRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return currentUser.role === "STAFF" ? (
        <Outlet />
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
        // KOI DETAILS
        {
            path: PATH.KOI_DETAIL,
            element:
                <UserLayout>
                    <KoiDetails />
                </UserLayout>
        },
        // PROFILE PAGE
        {
            path: PATH.PROFILE,
            element: (
                <ProtectedUserRouter />
            )
        },
        // ADMIN
        {
            path: PATH.ADMIN,
            element: <ProtectedRouter />,
            children: [
                {
                    index: true,
                    element: <Navigate to={PATH.ADMIN_STAFF} />,
                },
                {
                    path: PATH.ADMIN_STAFF,
                    element: (
                        <AdminLayout>
                            <StaffManagement />
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_SHOW,
                    element: (
                        <AdminLayout>
                            <ShowManagement />
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_ACCOUNT_SETTINGS,
                    element: (
                        <AdminLayout>
                            <AccountAdmin />
                        </AdminLayout>
                    )
                },
            ]
        },
        // STAFF
        {
            path: PATH.STAFF,
            element: <ProtectedStaffRouter />,
            children: [
                {
                    index: true,
                    element: <Navigate to={PATH.STAFF_MEMBER} />
                },
                {
                    path: PATH.STAFF_MEMBER,
                    element: (
                        <StaffLayout>
                            <MemberManagement />
                        </StaffLayout>
                    )

                },
                {
                    path: PATH.STAFF_REFEREE,
                    element: (
                        <StaffLayout>
                            <RefereeManagement />
                        </StaffLayout>
                    )
                },

            ]
        }

    ])

    return routes;
}

export default useRouteElement
