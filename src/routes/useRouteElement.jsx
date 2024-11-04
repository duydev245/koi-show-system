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
import { AdminLayout } from '../layouts/AdminLayout'
import { ShowManagement } from '../modules/Admin/ShowManagement'
import { AccountAdmin } from '../modules/Admin/AccountAdmin'
import { StaffLayout } from '../layouts/StaffLayout'
import { ApplicationManagement } from '../modules/Staff/ApplicationManagement'
import { CartPage } from '../modules/User/CartPage'
import { RegisterPage } from '../modules/User/RegisterPage'
import { MyKoiPage } from '../modules/User/ProfilePage/MyKoiPage'
import { MyRegPage } from '../modules/User/ProfilePage/MyRegPage'
import { MyAccSettings } from '../modules/User/ProfilePage/MyAccSettings'
import { RegDetails } from '../modules/User/RegDetails'
import { NotFoundComponent } from '../components/NotFoundComponent'
import { RefereeLayout } from '../layouts/RefereeLayout'
import { AccountReferee } from '../modules/Referee/AccountReferee'
import { ScoreKoi } from '../modules/Referee/ScoreKoi'
import { DashBoardAdmin } from '../modules/Admin/DashBoardAdmin'
import { VarietyManangement } from '../modules/Admin/VarietyManangement'
import { AccountStaff } from '../modules/Staff/AccountStaff'
import { UpcomingAdminShow } from '../modules/Admin/ShowManagement/UpcomingAdminShow'
import { OngoingAdminShow } from '../modules/Admin/ShowManagement/OngoingAdminShow'
import { ScoringAdminShow } from '../modules/Admin/ShowManagement/ScoringAdminShow'
import { FinishedAdminShow } from '../modules/Admin/ShowManagement/FinishedAdminShow'
import { UserManagement } from '../modules/Admin/UserManagement'
import { AboutUsPage } from '../modules/User/AboutUsPage'
import { ServicesPage } from '../modules/User/ServicesPage'
import { ContactPage } from '../modules/User/ContactPage'

// Authen
const RejectedRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Outlet />;
    }

    if (currentUser.role === 'Manager') {
        return <Navigate to={PATH.ADMIN} />;
    }

    if (currentUser.role === 'Staff') {
        return <Navigate to={PATH.STAFF} />;
    }

    if (currentUser.role === 'Referee') {
        return <Navigate to={PATH.REFEREE} />;
    }

    return <Navigate to={PATH.HOME} />;
};

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

    return currentUser.role === "Manager" ? (
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

    return currentUser.role === "Staff" ? (
        <Outlet />
    ) : (
        <Navigate to={PATH.HOME} />
    );
};

// Referee role
const ProtectedRefereeRouter = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (currentUser === null) {
        return <Navigate to={PATH.LOGIN} />;
    }

    return currentUser.role === "Referee" ? (
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
        // ABOUT US PAGE
        {
            path: PATH.ABOUT_US,
            element:
                <UserLayout>
                    <AboutUsPage />
                </UserLayout>,
        },
        // SERVICES PAGE
        {
            path: PATH.SERVICES,
            element:
                <UserLayout>
                    <ServicesPage />
                </UserLayout>,
        },
        // CONTACT PAGE
        {
            path: PATH.CONTACT,
            element:
                <UserLayout>
                    <ContactPage />
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
                    element: <Navigate to={PATH.ADMIN_DASHBOARD} />,
                },
                {
                    path: PATH.ADMIN_DASHBOARD,
                    element: (
                        <AdminLayout>
                            <DashBoardAdmin />
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_USER,
                    element: (
                        <AdminLayout>
                            <UserManagement />
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_VARIETY,
                    element: (
                        <AdminLayout>
                            <VarietyManangement />
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
                    path: PATH.ADMIN_UPCOMING_SHOW,
                    element: (
                        <AdminLayout>
                            <UpcomingAdminShow />
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_ONGOING_SHOW,
                    element: (
                        <AdminLayout>
                            <OngoingAdminShow />
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_SCORING_SHOW,
                    element: (
                        <AdminLayout>
                            <ScoringAdminShow />
                        </AdminLayout>
                    )
                },
                {
                    path: PATH.ADMIN_FINISHED_SHOW,
                    element: (
                        <AdminLayout>
                            <FinishedAdminShow />
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
                    path: PATH.STAFF_ACCOUNT_SETTINGS,
                    element: (
                        <StaffLayout>
                            <AccountStaff />
                        </StaffLayout>
                    )
                },

            ]
        },
        // REFEREE
        {
            path: PATH.REFEREE,
            element: <ProtectedRefereeRouter />,
            children: [
                {
                    index: true,
                    element: <Navigate to={PATH.REFEREE_SCORE} />
                },
                {
                    path: PATH.REFEREE_SCORE,
                    element: (
                        <RefereeLayout>
                            <ScoreKoi />
                        </RefereeLayout>
                    )
                },
                {
                    path: PATH.REFEREE_ACCOUNT_SETTINGS,
                    element: (
                        <RefereeLayout>
                            <AccountReferee />
                        </RefereeLayout>
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
