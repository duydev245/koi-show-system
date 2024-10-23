import { Button, Layout, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeUser } from '../../redux/slices/user.slice';
import { removeLocalStorage } from '../../utils';
import { LoadingComponent } from '../../components/LoadingComponent';
import { FormOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import { PATH } from '../../routes/path';

const { Header, Sider, Content } = Layout;

const RefereeLayout = ({ children }) => {
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
                                selectedKeys={[location.pathname]}
                                onSelect={(item) => {
                                    navigate(item.key);
                                }}
                                items={[
                                    {
                                        key: PATH.REFEREE_SCORE,
                                        icon: <FormOutlined />,
                                        label: "Scoring Koi",
                                    },
                                    {
                                        key: PATH.REFEREE_ACCOUNT_SETTINGS,
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
    )
}

export default RefereeLayout
