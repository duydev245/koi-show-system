import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import dayjs from "dayjs";
import { useOpenModal } from '../../../../hooks/useOpenModal';
import SubmitAgainModal from './SubmitAgainModal';
import { registrationApi } from '../../../../apis/registration.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const InprocessTable = () => {

    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const [dataEdit, setDataEdit] = useState({});

    const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();

    const handleCloseEditModal = () => {
        closeEditModal();
        setDataEdit({});
    }

    // dataSourceProcessing
    const { data: dataSource, isLoading } = useQuery({
        queryKey: ["list-processing"],
        queryFn: () => registrationApi.getListRegByUser('inprocess'),
    });

    // handleEvaluateApi
    const { mutate: handleEvaluateApi, isPending: isPendingEvaluate } = useMutation({
        mutationFn: (payload) => registrationApi.putEvaluateReg(payload),
        onSuccess: (data) => {
            messageApi.open({
                content: data?.message || "Update registration successfully",
                type: "success",
                duration: 3,
            });
            handleCloseEditModal();
            queryClient.refetchQueries({
                queryKey: ["list-processing"],
                type: "active",
            });
        },
        onError: (error) => {
            messageApi.open({
                content: error?.message,
                type: "error",
                duration: 3,
            });
        },
    });

    const columns = [
        // Registration ID
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
        // koi name
        {
            title: "Koi name",
            key: "koi-name",
            dataIndex: "name",
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 2,
            },
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
            filters: [
                { text: 'Rejected', value: 'Rejected' },
                { text: 'Accepted', value: 'Accepted' },
                { text: 'Pending', value: 'Pending' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => {
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

                const status = record.status.toLowerCase();
                return (
                    <div className="flex">

                        {status === "rejected" && (
                            <>
                                <Button
                                    danger
                                    type="primary"
                                    className="mr-2"
                                    onClick={() => {
                                        openEditModal();
                                        setDataEdit(record)
                                    }}
                                    loading={false}
                                >
                                    Submit again
                                </Button>
                            </>
                        )}
                        {status === "accepted" && (
                            <>
                                <Button
                                    type="primary"
                                    className="mr-2"
                                    onClick={() => {
                                        alert(record.id)
                                    }}
                                    loading={false}
                                >
                                    View
                                </Button>
                            </>
                        )}
                    </div>
                );
            },
        },
    ];

    const statusOrder = {
        'rejected': 1,
        'accepted': 2,
        'pending': 3,
    };

    const dataSourceProcessing = (dataSource || []).sort((a, b) => {
        const statusA = statusOrder[a.status.toLowerCase()] || 4;
        const statusB = statusOrder[b.status.toLowerCase()] || 4;
        return statusA - statusB;
    });

    return (
        <>
            {contextHolder}
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

            <SubmitAgainModal
                key={'submit-again'}
                data={dataEdit}
                isOpen={isOpenEditModal}
                onCloseModal={handleCloseEditModal}
                handleEvaluateApi={handleEvaluateApi}
                isPending={isPendingEvaluate}
            />
        </>
    )
}

export default InprocessTable