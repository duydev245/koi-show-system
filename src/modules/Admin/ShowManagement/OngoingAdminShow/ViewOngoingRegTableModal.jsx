import { Alert, Button, Modal, Pagination, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { registrationApi } from '../../../../apis/registration.api';
import { useQuery } from '@tanstack/react-query';
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { useOpenModal } from '../../../../hooks/useOpenModal';
import ViewMediaRegModal from '../ViewMediaRegModal';

const ViewOngoingRegTableModal = (
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
        // koi variety
        {
            title: "Variety",
            key: "koi-variety",
            dataIndex: "variety",
            sorter: {
                compare: (a, b) => a.variety.localeCompare(b.variety),
                multiple: 3,
            },
        },
        // koi size
        {
            title: "Size",
            key: "koi-size",
            dataIndex: "size",
            render: (size) => {
                return <Typography>{size} cm</Typography>;
            },
            sorter: {
                compare: (a, b) => a.size - b.size,
                multiple: 4,
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
        // Create date
        {
            title: "Created Date",
            key: "create_date",
            dataIndex: "createDate",
            render: (date) => {
                return <Typography>{dayjs(date).format('MM/YYYY')}</Typography>;
            },
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
                // { text: 'Scored', value: 'Scored' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => {
                return (
                    <>
                        {(status === "Pending") && (<Tag icon={<SyncOutlined spin />} color="processing">Pending</Tag>)}
                        {(status === "Accepted") && (<Tag icon={<CheckCircleOutlined />} color="success">Approved</Tag>)}
                        {(status === "Rejected") && (<Tag icon={<CloseCircleOutlined />} color="error">Rejected</Tag>)}
                        {/* {(status === "Scored") && (<Tag icon={<CheckCircleOutlined />} color="success">Scored</Tag>)} */}
                        {/* {(status === "Not Scored") && (<Tag icon={<CloseCircleOutlined />} color="error">Not Scored</Tag>)} */}
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
        // Rank
        // {
        //     title: "Rank",
        //     key: "rank",
        //     dataIndex: "rank",
        //     sorter: {
        //         compare: (a, b) => a.rank - b.rank,
        //         multiple: 3,
        //     },
        //     render: (rank) => {
        //         return (
        //             <Typography>
        //                 Rank {rank}
        //             </Typography>
        //         )
        //     }
        // },
        // Total score
        // {
        //     title: "Total score",
        //     key: "totalScore",
        //     dataIndex: "totalScore",
        //     sorter: {
        //         compare: (a, b) => a.totalScore - b.totalScore,
        //         multiple: 4,
        //     },
        // },
        // Best Vote
        // {
        //     title: "Best Vote",
        //     key: "isBestVote",
        //     dataIndex: "isBestVote",
        //     filters: [
        //         { text: 'Best Vote', value: true },
        //         { text: 'Not Best', value: false },
        //     ],
        //     onFilter: (value, record) => record.isBestVote === value,
        //     render: (isBestVote) => {
        //         return isBestVote ? (
        //             <Tag icon={<CheckCircleOutlined />} color="success">Best Vote</Tag>
        //         ) : (
        //             <Tag icon={<CloseCircleOutlined />} color="error">Not Best</Tag>
        //         );
        //     }
        // },
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

export default ViewOngoingRegTableModal