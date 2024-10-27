import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Table, Tag, Typography } from 'antd'
import React from 'react'
import dayjs from "dayjs";

const ScoredTable = ({ dataSource, isLoading }) => {
    const columns = [
        // ID
        {
            title: "ID",
            width: 70,
            key: "regist-id",
            dataIndex: "id",
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 1,
            },
        },
        // Koi name
        {
            title: "Koi name",
            key: "koi-name",
            dataIndex: "name",
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 2,
            },
        },
        // Rank
        {
            title: "Rank",
            key: "rank",
            dataIndex: "rank",
            sorter: {
                compare: (a, b) => a.rank - b.rank,
                multiple: 3,
            },
            render: (rank) => {
                return (
                    <Typography>
                        Rank {rank}
                    </Typography>
                )
            }
        },
        // Total score
        {
            title: "Total score",
            key: "totalScore",
            dataIndex: "totalScore",
            sorter: {
                compare: (a, b) => a.totalScore - b.totalScore,
                multiple: 4,
            },
        },
        // Show name
        {
            title: "Show name",
            key: "show-name",
            dataIndex: "show",
            sorter: {
                compare: (a, b) => a.show.localeCompare(b.show),
                multiple: 5,
            },
        },
        // Best Vote
        {
            title: "Best Vote",
            key: "isBestVote",
            dataIndex: "isBestVote",
            filters: [
                { text: 'Best Vote', value: true },
                { text: 'Not Best', value: false },
            ],
            onFilter: (value, record) => record.isBestVote === value,
            render: (isBestVote) => {
                return isBestVote ? (
                    <Tag icon={<CheckCircleOutlined />} color="success">Best Vote</Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined />} color="error">Not Best</Tag>
                );
            }
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