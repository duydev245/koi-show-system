import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Table, Tag, Typography } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getLocalStorage } from '../../../utils';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

const ProfilePage = () => {

    const navigate = useNavigate();
    const currentUser = getLocalStorage("user");

    const columnsProcessing = [
        // Registration ID
        {
            title: "Registration ID",
            key: "regist-id",
            dataIndex: "koi_id",
        },
        // Show name
        {
            title: "Koi name",
            key: "koi-name",
            dataIndex: "koi_name",
        },
        // Create date
        {
            title: "Created date",
            key: "create_date",
            dataIndex: "create_date",
            render: (date) => {
                return <Typography>{dayjs(date).format('DD/MM/YYYY  h:mm A')}</Typography>;
            },
        },
        // Show name
        {
            title: "Show name",
            key: "show-name",
            dataIndex: "show_name",
        },
        // status
        {
            title: "Status",
            key: "regist-status",
            dataIndex: "status",
            render: (_, { status }) => {
                return (
                    <>
                        {(status === 0) && (<Tag icon={<SyncOutlined spin />} color="processing">Pending</Tag>)}
                        {(status === 1) && (<Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>)}
                        {(status === 2) && (<Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>)}
                    </>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (record) => {
                return (
                    <Button
                        type="primary"
                        className="mr-2"
                        onClick={() => {
                            alert(record.koi_id)
                        }}
                        loading={false}
                    >
                        <EditOutlined />
                    </Button>
                );
            },
        },
    ];

    const dataSourceProcessing = [
        {
            koi_id: "REG001",
            koi_name: "John Doe",
            show_name: "Amazing Talent Show",
            create_date: "2024-09-27T10:15:00",
            status: 0,
        },
        {
            koi_id: "REG002",
            koi_name: "Jane Smith",
            show_name: "Global Music Fest",
            create_date: "2024-09-26T14:30:00",
            status: 1,
        },
        {
            koi_id: "REG003",
            koi_name: "Michael Johnson",
            show_name: "Stand-Up Comedy Night",
            create_date: "2024-09-25T16:00:00",
            status: 2,
        },
        {
            koi_id: "REG004",
            koi_name: "Emily Davis",
            show_name: "Dance Battle",
            create_date: "2024-09-24T09:45:00",
            status: 0,
        },
        {
            koi_id: "REG005",
            koi_name: "Chris Brown",
            show_name: "Cooking Challenge",
            create_date: "2024-09-23T12:00:00",
            status: 1,
        },
        {
            koi_id: "REG006",
            koi_name: "Chris Brown",
            show_name: "Cooking Challenge",
            create_date: "2024-09-23T12:00:00",
            status: 1,
        }
    ];


    const columnsCompleted = [
        // Registration ID
        {
            title: "Registration ID",
            key: "regist-id",
            dataIndex: "koi_id",
        },
        // Show name
        {
            title: "Koi name",
            key: "koi-name",
            dataIndex: "koi_name",
        },
        // Award date
        {
            title: "Award date",
            key: "award_date",
            dataIndex: "award_date",
            render: (date) => {
                return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
            },
        },
        // Show name
        {
            title: "Show name",
            key: "show_name",
            dataIndex: "show_name",
        },
        // Total score
        {
            title: "Total score",
            key: "total_score",
            dataIndex: "total_score",
        },
        {
            title: "Action",
            key: "action",
            render: (record) => {
                return (
                    <Button
                        type="primary"
                        className="mr-2"
                        onClick={() => {
                            alert(record.koi_id)
                        }}
                        loading={false}
                    >
                        <EditOutlined />
                    </Button>
                );
            },
        },
    ];

    const dataSourceCompleted = [
        {
            key: 1,
            koi_id: "REG001",
            koi_name: "Sakura Koi",
            award_date: "2023-09-15",
            show_name: "Autumn Koi Show",
            total_score: 85,
        },
        {
            key: 2,
            koi_id: "REG002",
            koi_name: "Red Dragon",
            award_date: "2023-06-12",
            show_name: "Summer Splash",
            total_score: 90,
        },
        {
            key: 3,
            koi_id: "REG003",
            koi_name: "Golden Fin",
            award_date: "2023-05-21",
            show_name: "Spring Festival",
            total_score: 88,
        },
        {
            key: 4,
            koi_id: "REG004",
            koi_name: "Blue Wave",
            award_date: "2023-03-10",
            show_name: "Winter Koi Championship",
            total_score: 92,
        },
        {
            key: 5,
            koi_id: "REG005",
            koi_name: "Crystal Stream",
            award_date: "2023-07-19",
            show_name: "Ocean Koi Show",
            total_score: 87,
        },
        {
            key: 6,
            koi_id: "REG006",
            koi_name: "Crystal Stream",
            award_date: "2023-07-19",
            show_name: "Ocean Koi Show",
            total_score: 87,
        },
    ];


    return (
        <>
            <div className="container mx-auto grid lg:flex gap-10 py-5">
                {/* left section */}
                <Card
                    className='basis-3/12 block lg:sticky top-0 lg:top-20 h-fit border-gray-200 '
                >
                    {/* avatar user (optional) */}
                    <div className="space-y-3">
                        <img className="mx-auto w-36 h-36 object-cover rounded-full" alt="" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
                    </div>

                    <div className="space-y-4 mt-3">

                        <div className="flex justify-start items-center gap-3">
                            <img className="w-6" alt="" src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png" />
                            <p className="font-bold text-xl">Email Verified</p>
                        </div>

                        <button className="w-auto underline font-bold text-sm">Edit profile</button>

                        <div className='text-lg'>
                            <p className="font-semibold text-gray-500">Your name:</p>
                            <p className="font-semibold">{currentUser.name}</p>
                        </div>
                        <div className='text-lg'>
                            <p className="font-semibold text-gray-500">Email address:</p>
                            <p className="font-semibold">{currentUser.email}</p>
                        </div>
                        <div className='text-lg'>
                            <p className="font-semibold text-gray-500">Phone number:</p>
                            <p className="font-semibold">{currentUser.phone}</p>
                        </div>
                    </div>
                </Card>

                {/* right section */}
                <div className='basis-9/12 space-y-4'>
                    {/* Processing Registration */}
                    <div className='space-y-3 border border-gray-200 p-6 rounded-lg'>
                        <h1 className="font-bold text-2xl">Processing Registration:</h1>
                        <Table
                            rowKey="koi_id"
                            columns={columnsProcessing}
                            dataSource={dataSourceProcessing}
                            pagination={false}
                            loading={false}
                            scroll={{ y: 350 }}
                        />
                    </div>

                    {/* Completed Registration */}
                    <div className='space-y-3 border border-gray-200 p-6 rounded-lg'>
                        <h1 className="font-bold text-2xl">Completed Registration:</h1>
                        <Table
                            rowKey="koi_id"
                            columns={columnsCompleted}
                            dataSource={dataSourceCompleted}
                            pagination={false}
                            loading={false}
                            scroll={{ y: 350 }}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfilePage
