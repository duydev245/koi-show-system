import React, { useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Button } from 'antd';
import { FileTextOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, SolutionOutlined } from '@ant-design/icons';
import { PATH } from '../../../routes/path';

const { Content, Sider } = Layout;

const ProfilePage = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <Layout
                className='container mx-auto my-5'
                style={{
                    background: "#ffffff",
                }}
            >
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    style={{
                        background: "#ffffff",
                        minHeight: 450,
                    }}
                    width={205}
                >
                    <div className='flex items-center justify-center ps-1 pe-[5px]'>
                        <Button
                            type="text"
                            block
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className='h-[40px] rounded-lg'
                        />
                    </div>

                    <Menu
                        theme='light'
                        mode="inline"
                        defaultSelectedKeys={[location.pathname]}
                        onSelect={(item) => {
                            navigate(item.key);
                        }}
                        items={[
                            {
                                key: PATH.PROFILE_MY_KOI,
                                icon: <SolutionOutlined />,
                                label: "My Koi",
                            },
                            {
                                key: PATH.PROFILE_MY_REG,
                                icon: <FileTextOutlined />,
                                label: "My Registration",
                            },
                            {
                                key: PATH.PROFILE_MY_SETTINGS,
                                icon: <SettingOutlined />,
                                label: "My Account Settings",
                            },
                        ]}
                    />
                </Sider>

                <Content
                    style={{
                        margin: '0 5px',
                        minHeight: 450,
                    }}
                >
                    {children}
                </Content>

            </Layout>
        </>
    )
}

export default ProfilePage
