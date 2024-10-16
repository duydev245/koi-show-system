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
import { AccountAdmin } from '../modules/Admin/AccountAdmin'
import { StaffLayout } from '../layouts/StaffLayout'
import { ApplicationManagement } from '../modules/Staff/ApplicationManagement'
import { RefereeManagement } from '../modules/Staff/RefereeManagement'
import { MemberManagement } from '../modules/Admin/MemberManagement'
import { CartPage } from '../modules/User/CartPage'
import { RegisterPage } from '../modules/User/RegisterPage'
import { MyKoiPage } from '../modules/User/ProfilePage/MyKoiPage'
import { MyRegPage } from '../modules/User/ProfilePage/MyRegPage'
import { MyAccSettings } from '../modules/User/ProfilePage/MyAccSettings'
import { RegDetails } from '../modules/User/RegDetails'
import { NotFoundComponent } from '../components/NotFoundComponent'

// Authen
const RejectedRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Outlet />;
    }

    if (currentUser.role === 'Admin') {
        return <Navigate to={PATH.ADMIN} />;
    }

    if (currentUser.role === 'Staff') {
        return <Navigate to={PATH.STAFF} />;
    }

    return <Navigate to={PATH.HOME} />;
};

// Profile Page for each role
// const ProfilePageRouter = () => {
//     const { currentUser } = useSelector((state) => state.user);

//     if (!currentUser) {
//         return <Navigate to={PATH.LOGIN} />;
//     }

//     if (currentUser.role === 'Admin') {
//         return <Navigate to={PATH.ADMIN} />;
//     }

//     if (currentUser.role === 'Staff') {
//         return <Navigate to={PATH.STAFF} />;
//     }

//     if (currentUser.role === 'Member') {
//         return (
//             <UserLayout>
//                 <ProfilePage />
//             </UserLayout>
//         );
//     }

//     return <Navigate to={PATH.HOME} />;
// };

// Member role 
const ProtectedMemberRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return currentUser.role === "Member" ? (
        <Outlet />
    ) : (
        <Navigate to={PATH.HOME} />
    );
};

// Admin role
const ProtectedRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return currentUser.role === "Admin" ? (
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
        // MEMBER
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
        // REGISTRATION DETAILS
        {
            path: PATH.REG_DETAIL,
            element:
                <UserLayout>
                    <RegDetails />
                </UserLayout>
        },
        // PROFILE PAGE
        {
            path: PATH.PROFILE,
            element: <ProtectedMemberRouter />,
            children: [
                {
                    index: true,
                    element: <Navigate to={PATH.PROFILE_MY_KOI} />,
                },
                {
                    path: PATH.PROFILE_MY_KOI,
                    element: (
                        <UserLayout>
                            <ProfilePage>
                                <MyKoiPage />
                            </ProfilePage>
                        </UserLayout>
                    )
                },
                {
                    path: PATH.PROFILE_MY_REG,
                    element: (
                        <UserLayout>
                            <ProfilePage>
                                <MyRegPage />
                            </ProfilePage>
                        </UserLayout>
                    )
                },
                {
                    path: PATH.PROFILE_MY_SETTINGS,
                    element: (
                        <UserLayout>
                            <ProfilePage>
                                <MyAccSettings />
                            </ProfilePage>
                        </UserLayout>
                    )
                },
            ]
        },
        // REGISTER
        {
            path: PATH.HOME,
            element: <ProtectedMemberRouter />,
            children: [
                {
                    path: PATH.KOI_REGISTER,
                    element: (
                        <UserLayout>
                            <RegisterPage />
                        </UserLayout>
                    )
                },
                {
                    path: PATH.USER_CART,
                    element: (
                        <UserLayout>
                            <CartPage />
                        </UserLayout>
                    )
                },
            ]
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
                    path: PATH.ADMIN_MEMBER,
                    element: (
                        <AdminLayout>
                            <MemberManagement />
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
                    element: <Navigate to={PATH.STAFF_APLLYCATION} />
                },
                {
                    path: PATH.STAFF_APLLYCATION,
                    element: (
                        <StaffLayout>
                            <ApplicationManagement />
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
        },

        // Route direct to 404 Page if not exist any path above
        {
            path: "*",
            element: (
                <UserLayout>
                    <NotFoundComponent />
                </UserLayout>
            )
        }
    ])

    return routes;
}

export default useRouteElement
