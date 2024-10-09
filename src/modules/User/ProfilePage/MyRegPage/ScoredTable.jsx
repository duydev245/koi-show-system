import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Typography } from 'antd'
import React from 'react'
import dayjs from "dayjs";

const ScoredTable = ({ dataSource, isLoading }) => {
    const columns = [
        // Registration ID
        {
            title: "Registration ID",
            key: "regist-id",
            dataIndex: "id",
        },
        // Koi name
        {
            title: "Koi name",
            key: "koi-name",
            dataIndex: "name",
        },
        // Total score
        {
            title: "Total score",
            key: "totalScore",
            dataIndex: "totalScore"
        },
        // Show name
        {
            title: "Show name",
            key: "show-name",
            dataIndex: "show",
        },
        // Show group
        {
            title: "Show group",
            key: "show-group",
            dataIndex: "group",
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
                            alert(record.id)
                        }}
                        loading={false}
                    >
                        <EditOutlined />
                    </Button>
                );
            },
        },
    ];

    const dataSourceCompleted = dataSource || []

    return (
        <div className='space-y-3 border border-gray-200 p-6 rounded-lg'>
            <h1 className="font-bold text-2xl">Scored Registration:</h1>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSourceCompleted}
                pagination={false}
                loading={isLoading}
                scroll={{ y: 350 }}
            />
        </div>
    )
}

export default ScoredTable