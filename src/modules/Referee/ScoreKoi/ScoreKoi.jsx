import React, { useEffect, useState } from 'react'
import { showApi } from '../../../apis/show.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, message, Table, Tag } from 'antd';
import { useOpenModal } from '../../../hooks/useOpenModal';
import ScoringModal from './ScoringModal';
import { registrationApi } from '../../../apis/registration.api';

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
                content: error?.message,
                type: "error",
                duration: 3,
            });
        },
    });


    return (
        <>
            {contextHolder}
            <div className='flex flex-col justify-center items-start mb-4'>
                <h1 className='text-black text-2xl font-bold'>{showName}</h1>
            </div>

            {listGroups.length > 0 && (
                listGroups.map((group, index) => {

                    const columns = [
                        // reg id
                        {
                            title: "ID",
                            key: "reg-id",
                            dataIndex: "registrationId",
                        },
                        // Koi Name
                        {
                            title: "Name",
                            key: "koi-name",
                            dataIndex: "koiName",
                        },
                        // Status
                        {
                            title: "Status",
                            key: "score-status",
                            render: () => {
                                return (
                                    <Tag color="error">
                                        NOT SCORE
                                    </Tag>
                                )
                            }
                        },
                        // Action
                        {
                            title: "Action",
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

                    return (
                        <div key={index} className='bg-gray-100 rounded-lg p-3 mb-3'>
                            <div className='grid grid-cols-2 mb-4 px-3'>
                                <p className="font-semibold text-xl">{group.groupName}</p>
                                <div className="font-semibold text-base">
                                    <p className="text-green-600"><span>Scored:</span> {group.scored}</p>
                                    <p className="text-red-600"><span>Not Scored:</span> {group.amountNotScored}</p>
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