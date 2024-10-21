import React, { useEffect, useState } from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CalendarOutlined,
    PictureOutlined,
    HomeOutlined,
    SettingOutlined,
    BarChartOutlined,
    ProductOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeUser } from '../../redux/slices/user.slice';
import { removeLocalStorage } from '../../utils';
import { PATH } from '../../routes/path';
import { LoadingComponent } from '../../components/LoadingComponent';

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleLogOut = () => {
        dispatch(removeUser(null));
        removeLocalStorage("user");
        removeLocalStorage("token");
        window.location.reload();
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <LoadingComponent />
                ) : (
                    <Layout className="h-screen">
                        <Sider trigger={null} collapsible collapsed={collapsed}>
                            <div className="text-center flex items-center h-[80px] justify-center cursor-pointer">
                                <img className='rounded-full' src="/logo-koi.jpg" width={40} onClick={() => navigate(PATH.HOME)} />
                            </div>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={[location.pathname]}
                                onSelect={(item) => {
                                    navigate(item.key);
                                }}
                                items={[
                                    {
                                        key: PATH.ADMIN_DASHBOARD,
                                        icon: <BarChartOutlined />,
                                        label: "Dashboard & Statistics",
                                    },
                                    {
                                        key: PATH.ADMIN_SHOW,
                                        icon: <CalendarOutlined />,
                                        label: "Show Management",
                                    },
                                    {
                                        key: PATH.ADMIN_STAFF,
                                        icon: <UserOutlined />,
                                        label: "Staff Management",
                                    },
                                    {
                                        key: PATH.ADMIN_VARIETY,
                                        icon: <ProductOutlined />,
                                        label: "Variety Management",
                                    },
                                    {
                                        key: PATH.ADMIN_ACCOUNT_SETTINGS,
                                        icon: <SettingOutlined />,
                                        label: "Account Settings",
                                    },
                                ]}
                            />
                        </Sider>

                        <Layout>
                            <Header
                                style={{ padding: 0, background: colorBgContainer }}
                                className="flex items-center justify-between"
                            >
                                <Button
                                    type="text"
                                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                    onClick={() => setCollapsed(!collapsed)}
                                    style={{
                                        fontSize: "16px",
                                        width: 64,
                                        height: 64,
                                    }}
                                />

                                <Button
                                    onClick={handleLogOut}
                                    className="mx-5 font-medium"
                                    size="large"
                                    type="default"
                                    danger
                                >
                                    Log Out
                                </Button>
                            </Header>

                            <Content
                                style={{
                                    margin: "24px 16px",
                                    padding: 24,
                                    minHeight: 280,
                                    background: colorBgContainer,
                                    borderRadius: borderRadiusLG,
                                    overflowY: "scroll",
                                }}
                            >
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                )
            }
        </>
    );
}

export default AdminLayout
