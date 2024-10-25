import { Alert, Breadcrumb, Button, Image, message, Popconfirm, Skeleton, Table, Tag, Typography } from 'antd'
import React from 'react'
import { PATH } from '../../../routes/path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showApi } from '../../../apis/show.api';
import { CheckCircleOutlined, ClockCircleOutlined, DeleteOutlined, EditOutlined, HourglassOutlined, MinusCircleOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useOpenModal } from '../../../hooks/useOpenModal';
import AddShowModal from './AddShowModal';
import { useNavigate } from 'react-router-dom';
import { groupApi } from '../../../apis/group.api';

const renderShowStatus = (status) => {
    const lowerStatus = status.toLowerCase();

    switch (lowerStatus) {
        case 'up comming':
            return (
                <Tag icon={<ClockCircleOutlined />} color="blue">
                    Upcoming
                </Tag>
            );
        case 'on going':
            return (
                <Tag icon={<CheckCircleOutlined />} color="success">
                    Ongoing
                </Tag>
            );
        case 'scoring':
            return (
                <Tag icon={<HourglassOutlined spin />} color="warning">
                    Scoring
                </Tag>
            );
        case 'finished':
            return (
                <Tag icon={<MinusCircleOutlined />} color="error">
                    Finished
                </Tag>
            );
        default:
            return (
                <Tag icon={<ClockCircleOutlined />} color="default">
                    {status}
                </Tag>
            );
    }
};

const ShowManagement = () => {

    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const { isOpen: isOpenAddShowModal, openModal: openAddShowModal, closeModal: closeAddShowModal } = useOpenModal();

    // dataListShow
    const { data: dataListShow, isLoading: isLoadingShow, error } = useQuery({
        queryKey: ["list-show"],
        queryFn: () => showApi.getAllListShow(),
    });

    // handleAddShowApi
    const { mutate: handleAddShowApi, isPending: isPendingAdd } = useMutation({
        mutationFn: (payload) => showApi.postAddShow(payload),
        onSuccess: (data) => {
            messageApi.open({
                content: data?.message || "Create Show successfully",
                type: "success",
                duration: 3,
            });
            closeAddShowModal();
            queryClient.refetchQueries({
                queryKey: ["list-show"],
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

    // handleReviewGroupScoreShowApi
    const { mutate: handleReviewGroupScoreShowApi, isPending: isPendingReview } = useMutation({
        mutationFn: (id) => groupApi.getReviewGroupScoreByShowId(id),
        onSuccess: (data) => {
            messageApi.open({
                content: data?.message || "Review Group Score successfully",
                type: "success",
                duration: 3,
            });
            queryClient.refetchQueries({
                queryKey: ["list-show"],
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
        // Show ID
        {
            title: 'Show ID',
            dataIndex: 'showId',
            key: 'showId',
            width: 120,
            sorter: {
                compare: (a, b) => a.showId - b.showId,
                multiple: 4,
            },
        },
        // Show Title
        {
            title: 'Show Title',
            dataIndex: 'showTitle',
            width: 300,
            key: 'showTitle',
            sorter: {
                compare: (a, b) => a.showTitle.length - b.showTitle.length,
                multiple: 4,
            },
        },
        // Banner
        {
            title: 'Banner',
            dataIndex: 'showBanner',
            key: 'showBanner',
            width: 350,
            render: (showBanner) => {
                return isLoadingShow ? (
                    <Skeleton.Image
                        active
                        className='w-full'
                    />
                ) : (
                    showBanner && (
                        <Image
                            height={150}
                            src={showBanner}
                            alt={showBanner}
                            className="rounded-sm object-cover"
                        />
                    )
                );
            },
        },
        // Description
        {
            title: 'Description',
            dataIndex: 'showDesc',
            key: 'showDesc',
            width: 400,
            render: (showDesc) => {
                return (
                    <Typography.Paragraph
                        ellipsis={{
                            rows: 3,
                        }}
                    >
                        {showDesc}
                    </Typography.Paragraph>
                );
            },
        },
        // Status
        {
            title: 'Status',
            dataIndex: 'showStatus',
            key: 'showStatus',
            render: (status) => renderShowStatus(status),
            filters: [
                { text: 'Upcoming', value: 'up comming' },
                { text: 'Ongoing', value: 'on going' },
                { text: 'Scoring', value: 'scoring' },
                { text: 'Finished', value: 'finished' },
            ],
            onFilter: (value, record) => record.showStatus.toLowerCase() === value,
        },
        // Action
        {
            title: "Action",
            width: 300,
            key: "action",
            render: (record) => {

                const status = record.showStatus.toLowerCase();

                return (
                    <div className="flex">

                        {status === "up comming" && (
                            <>
                                <Button
                                    type="default"
                                    className="mr-2"
                                    onClick={() => {
                                        navigate(PATH.ADMIN_UPCOMING_SHOW, { state: { showId: record.showId } })
                                    }}
                                    loading={false}
                                >
                                    View
                                </Button>

                                <Popconfirm
                                    title="Delete show"
                                    description="Are you sure to delete this?"
                                    onConfirm={() => {
                                        alert(`Delete show: ${record.showId}`);
                                    }}
                                    onCancel={() => { }}
                                    placement="top"
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger disabled={false}>
                                        <DeleteOutlined />
                                    </Button>
                                </Popconfirm>
                            </>
                        )}

                        {status === "on going" && (
                            <>
                                <Button
                                    type="default"
                                    className="mr-2"
                                    onClick={() => {
                                        navigate(PATH.ADMIN_ONGOING_SHOW, { state: { showId: record.showId } })
                                    }}
                                    loading={false}
                                >
                                    View
                                </Button>
                            </>
                        )}

                        {status === "scoring" && (
                            <>
                                <Button
                                    type="default"
                                    className="mr-2"
                                    onClick={() => {
                                        navigate(PATH.ADMIN_SCORING_SHOW, { state: { showId: record.showId } })
                                    }}
                                    loading={false}
                                >
                                    View
                                </Button>

                                <Button
                                    type="primary"
                                    className="mr-2"
                                    loading={isPendingReview}
                                    onClick={() => {
                                        handleReviewGroupScoreShowApi(record.showId);
                                    }}
                                >
                                    Score
                                </Button>
                            </>
                        )}

                        {status === "finished" && (
                            <>
                                <Button
                                    type="default"
                                    className="mr-2"
                                    onClick={() => {
                                        alert(`View show: ${record.showId}`);
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
        'scoring': 1,
        'on going': 2,
        'up comming': 3,
        'finished': 4,
    };

    const dataSource = (dataListShow || []).sort((a, b) => {
        const statusA = statusOrder[a.showStatus.toLowerCase()] || 5;
        const statusB = statusOrder[b.showStatus.toLowerCase()] || 5;
        return statusA - statusB;
    });

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
            {contextHolder}
            <div className="flex items-center justify-between">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: "Dashboard",
                        },
                        {
                            title: "Show Management",
                            href: PATH.ADMIN_SHOW,
                        },
                    ]}
                />

                <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                        openAddShowModal()
                    }}
                >
                    <PlusSquareOutlined />
                </Button>
            </div>


            <h3 className="font-medium text-3xl mb-3">Manage Show</h3>
            <Table
                rowKey="showId"
                columns={columns}
                dataSource={dataSource}
                pagination={true}
                loading={isLoadingShow}
            />

            <AddShowModal
                key={'create-show'}
                isOpen={isOpenAddShowModal}
                onCloseModal={closeAddShowModal}
                isPending={isPendingAdd}
                handleAddShowApi={handleAddShowApi}
            />
        </>
    )
}

export default ShowManagement
