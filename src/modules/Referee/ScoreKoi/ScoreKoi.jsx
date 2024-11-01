import React, { useEffect, useState } from 'react'
import { showApi } from '../../../apis/show.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, message, Table, Tag } from 'antd';
import { useOpenModal } from '../../../hooks/useOpenModal';
import ScoringModal from './ScoringModal';
import { registrationApi } from '../../../apis/registration.api';
import { PATH } from '../../../routes/path';

const ScoreKoi = () => {

    const { isOpen: isOpenScoringModal, openModal: openScoringModal, closeModal: closeScoringModal } = useOpenModal();
    const [messageApi, contextHolder] = message.useMessage();
    const queryClient = useQueryClient();

    const [listGroups, setListGroups] = useState([]);
    const [showName, setShowName] = useState('');
    const [dataScore, setDataScore] = useState({});

    // data list koi
    const { data, isLoading } = useQuery({
        queryKey: ["list-koi"],
        queryFn: () => showApi.getListScored(),
    });

    useEffect(() => {
        if (data && data.length > 0) {
            const dataList = data[0];
            const showGroups = dataList?.showGroups || [];
            setShowName(dataList?.showTitle);
            setListGroups(showGroups);
        }
    }, [data]);

    const handleCloseEditModal = () => {
        closeScoringModal();
        setDataScore({});
    }

    // score api
    const { mutate: handleScoringApi, isPending: isPendingScoring } = useMutation({
        mutationFn: (payload) => registrationApi.postScoringReg(payload),
        onSuccess: () => {
            messageApi.open({
                content: data?.message || "Scoring successfully",
                type: "success",
                duration: 3,
            });
            handleCloseEditModal();
            queryClient.refetchQueries({
                queryKey: ["list-koi"],
                type: "active",
            });
        },
        onError: (error) => {
            messageApi.open({
                content: "Waiting...",
                type: "error",
                duration: 3,
            });
        },
    });


    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between mb-2">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: "Dashboard",
                        },
                        {
                            title: "Score Koi",
                            href: PATH.REFEREE_SCORE,
                        },
                    ]}
                />
            </div>

            <div className='flex flex-col justify-center items-start mb-4'>
                <h1 className='text-black text-2xl font-bold'>{showName}</h1>
            </div>

            {listGroups.length > 0 && (
                listGroups.map((group, index) => {

                    const columns = [
                        // reg id
                        {
                            title: "ID",
                            width: 100,
                            key: "reg-id",
                            dataIndex: "registrationId",
                        },
                        // Koi Name
                        {
                            title: "Name",
                            width: 250,
                            key: "koi-name",
                            dataIndex: "koiName",
                        },
                        // Status
                        {
                            title: "Status",
                            width: 150,
                            key: "score-status",
                            dataIndex: "isScored",
                            render: (isScored) => {
                                return (
                                    isScored ? (
                                        <Tag color="success">SCORED</Tag>
                                    ) : (
                                        <Tag color="error">NOT SCORED</Tag>
                                    )
                                )
                            }
                        },
                        // Action
                        {
                            title: "Action",
                            width: 250,
                            key: "action",
                            render: (record) => {
                                return (
                                    <Button
                                        type="primary"
                                        size='large'
                                        loading={false}
                                        onClick={() => {
                                            setDataScore(record);
                                            openScoringModal();
                                        }}>
                                        <PlusSquareOutlined />
                                    </Button>
                                );
                            },
                        },
                    ];

                    const dataSource = group.kois || [];

                    let totalScored = dataSource.filter(koi => koi.isScored).length;
                    let totalNotScored = dataSource.length - totalScored;

                    return (
                        <div key={index} className='bg-gray-100 rounded-lg p-3 mb-3'>
                            <div className='grid grid-cols-2 mb-4 px-3'>
                                <p className="font-semibold text-xl">{group.groupName}</p>
                                <div className="font-semibold text-base">
                                    <p className="text-green-600"><span>Scored:</span> {totalScored}</p>
                                    <p className="text-red-600"><span>Not Scored:</span> {totalNotScored}</p>
                                </div>
                            </div>
                            <Table
                                rowKey="registrationId"
                                columns={columns}
                                dataSource={dataSource}
                                pagination={false}
                                loading={isLoading}
                            />
                        </div>
                    )
                })
            )}

            <ScoringModal
                isOpen={isOpenScoringModal}
                isPending={isPendingScoring}
                onCloseModal={handleCloseEditModal}
                data={dataScore}
                handleScoringApi={handleScoringApi}
            />
        </>
    )
}

export default ScoreKoi