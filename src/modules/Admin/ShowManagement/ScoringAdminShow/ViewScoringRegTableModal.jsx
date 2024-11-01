import React, { useEffect, useState } from 'react'
import { useOpenModal } from '../../../../hooks/useOpenModal';
import { useQuery } from '@tanstack/react-query';
import { Alert, Button, Modal, Pagination, Table, Tag, Typography } from 'antd';
import dayjs from "dayjs";
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import ViewMediaRegModal from '../ViewMediaRegModal';
import { registrationApi } from '../../../../apis/registration.api';

const ViewScoringRegTableModal = (
    {
        groupId,
        isOpen,
        onCloseModal,
    }
) => {

    const [regData, setRegData] = useState([]);
    const [dataKoi, setDataKoi] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [totalSize, setTotalSize] = useState(100);

    const { isOpen: isOpenMediaModal, openModal: openMediaModal, closeModal: closeMediaModal } = useOpenModal();

    const handleOnCloseModal = () => {
        setDataKoi({});
        closeMediaModal();
    }

    // dataRegByGroup
    const { data: dataRegByGroup, isLoading: isLoadingData, error } = useQuery({
        queryKey: ["data-reg-group", { currentPage }],
        queryFn: () => registrationApi.getListRegByGroupId({ groupId: groupId, pageIndex: currentPage }),
        enabled: !!groupId,
    });

    useEffect(() => {
        if (dataRegByGroup) {
            setTotalSize(dataRegByGroup?.totalItems);
            setRegData(dataRegByGroup?.registrations);
        }
    }, [dataRegByGroup, setTotalSize, setRegData]);

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
        // Show (Group)
        {
            title: "Show (Group)",
            width: 250,
            key: "koi-show-group",
            render: (record) => {
                return <Typography>{record.show} ({record.group})</Typography>;
            },
        },
        // Rank
        {
            title: "Rank",
            width: 100,
            key: "rank",
            dataIndex: "rank",
            sorter: {
                compare: (a, b) => a.rank - b.rank,
                multiple: 3,
            },
            render: (rank) => (
                rank ? (
                    <Typography>
                        Rank {rank}
                    </Typography>
                ) : (
                    <Typography>
                        Not yet
                    </Typography>
                )
            )
        },
        // Total score
        {
            title: "Total score",
            width: 120,
            key: "totalScore",
            dataIndex: "totalScore",
            sorter: {
                compare: (a, b) => a.totalScore - b.totalScore,
                multiple: 4,
            },
            render: (totalScore) => (
                totalScore ? (
                    <Typography>
                        {totalScore}
                    </Typography>
                ) : (
                    <Typography>
                        Not yet
                    </Typography>
                )
            )
        },
        // Best Vote
        {
            title: "Best Vote",
            width: 120,
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
        // Total score
        {
            title: "Total Vote",
            width: 120,
            key: "totalVote",
            dataIndex: "totalVote",
            sorter: {
                compare: (a, b) => a.totalVote - b.totalVote,
                multiple: 5,
            },
            render: (totalVote) => (
                totalVote && (
                    <Typography>
                        {totalVote}
                    </Typography>
                )
            )
        },
        // status
        {
            title: "Status",
            width: 120,
            key: "regist-status",
            dataIndex: "status",
            filters: [
                // { text: 'Rejected', value: 'Rejected' },
                // { text: 'Pending', value: 'Pending' },
                { text: 'Accepted', value: 'Not Scored' },
                { text: 'Scored', value: 'Scored' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => {
                return (
                    <>
                        {/* {(status === "Pending") && (<Tag icon={<SyncOutlined spin />} color="processing">Pending</Tag>)}
                        {(status === "Accepted") && (<Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>)}
                        {(status === "Rejected") && (<Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>)} */}
                        {(status === "Scored") && (<Tag icon={<CheckCircleOutlined />} color="success">Scored</Tag>)}
                        {(status === "Accepted") && (<Tag icon={<CloseCircleOutlined />} color="error">Not Scored</Tag>)}
                    </>
                );
            },
        },
        {
            title: "Action",
            key: "action",
            render: (record) => {
                return (
                    <div className="flex">
                        <Button
                            type="primary"
                            className="mr-2"
                            onClick={() => {
                                setDataKoi(record)
                                openMediaModal();
                            }}
                            loading={false}
                        >
                            View media
                        </Button>
                    </div>
                );
            },
        },
    ];

    if (error) {
        return (
            <Alert
                message="Warning"
                description="Something went wrong..."
                type="warning"
                showIcon
            />
        );
    }

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-xl font-medium">
                        View registrations by group
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={1200}
            >
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={regData}
                    pagination={false}
                    loading={isLoadingData}
                />

                <Pagination
                    className='m-2'
                    align="end"
                    total={totalSize}
                    simple
                    pageSize={10}
                    current={currentPage}
                    onChange={(page) => {
                        setCurrentPage(page);
                    }}
                    showSizeChanger={false}
                />

            </Modal>

            <ViewMediaRegModal
                key={'view-media-reg'}
                data={dataKoi}
                isOpen={isOpenMediaModal}
                onCloseModal={handleOnCloseModal}
            />
        </>
    )
}

export default ViewScoringRegTableModal