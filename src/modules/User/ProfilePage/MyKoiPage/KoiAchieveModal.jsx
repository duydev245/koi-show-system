import { Alert, Modal, Table, Typography } from 'antd'
import React from 'react'
import { render } from 'rsuite/esm/internals/utils';

const KoiAchieveModal = (
    {
        data,
        isOpen,
        onCloseModal,
        isLoading,
    }
) => {

    const columns = [
        // Registration ID
        {
            title: "Registration ID",
            key: "koi-id",
            dataIndex: "id",
            width: 150,
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 4,
            },
        },
        // Show
        {
            title: "Show",
            key: "koi-show",
            dataIndex: "show",
        },
        // group
        {
            title: "Show group",
            key: "koi-group",
            dataIndex: "group",
        },
        // size
        {
            title: "Size",
            key: "koi-size",
            dataIndex: "size",
            render: (size) => {
                return (
                    <Typography>
                        {size} cm
                    </Typography>
                )
            }
        },
        // rank
        {
            title: "Rank",
            key: "koi-rank",
            dataIndex: "rank",
            render: (rank) => {
                return (
                    <Typography>
                        Rank {rank}
                    </Typography>
                )
            }
        },
        // totalScore
        {
            title: "Total Score",
            key: "koi-totalScore",
            dataIndex: "totalScore",
        },
    ]

    const dataSource = data?.registrations || [];

    return (
        <>
            <Modal
                open={isOpen}
                className='max-h-screen'
                loading={isLoading}
                title={
                    <Typography className="text-xl font-medium">
                        View {data.koiName} achievement
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={1200}
            >
                {dataSource && dataSource.length > 0 ? (
                    <Table
                        rowKey="id"
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        loading={isLoading}
                    />
                ) : (
                    <Alert
                        message="Notification"
                        description="Your Koi hasn't had any achievements! :("
                        type="info"
                        showIcon
                    />
                )}
            </Modal>
        </>
    )
}

export default KoiAchieveModal