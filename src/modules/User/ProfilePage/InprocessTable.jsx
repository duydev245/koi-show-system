import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Typography } from 'antd'
import React from 'react'
import dayjs from "dayjs";

const InprocessTable = ({ dataSource, isLoading }) => {

    const columns = [
        // Registration ID
        {
            title: "Registration ID",
            key: "regist-id",
            dataIndex: "id",
        },
        // Show name
        {
            title: "Koi name",
            key: "koi-name",
            dataIndex: "name",
        },
        // Create date
        {
            title: "Created date",
            key: "create_date",
            dataIndex: "createDate",
            render: (date) => {
                return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
            },
        },
        // Show name
        {
            title: "Show name",
            key: "show-name",
            dataIndex: "show",
        },
        // status
        {
            title: "Status",
            key: "regist-status",
            dataIndex: "status",
            render: (_, { status }) => {
                return (
                    <>
                        {(status === "Pending") && (<Tag icon={<SyncOutlined spin />} color="processing">Pending</Tag>)}
                        {(status === "Accepted") && (<Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>)}
                        {(status === "Rejected") && (<Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>)}
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

    const dataSourceProcessing = dataSource || [];

    return (
        <div className='space-y-3 border border-gray-200 p-6 rounded-lg'>
            <h1 className="font-bold text-2xl">Processing Registration:</h1>
            <Table
                rowKey="id"
                columns={columns}
                dataSource={dataSourceProcessing}
                pagination={false}
                loading={isLoading}
                scroll={{ y: 350 }}
            />
        </div>
    )
}

export default InprocessTable