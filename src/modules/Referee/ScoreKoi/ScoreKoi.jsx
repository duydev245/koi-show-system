import React, { useEffect, useState } from 'react'
import { showApi } from '../../../apis/show.api';
import { useQuery } from '@tanstack/react-query';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

const ScoreKoi = () => {

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

    return (
        <>
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
                                            console.log(record)
                                        }}>
                                        <PlusSquareOutlined />
                                    </Button>
                                );
                            },
                        },
                    ]

                    const dataSource = group.kois || []

                    return (
                        <>
                            <div key={index} className='bg-gray-100 rounded-lg p-3 mb-3'>
                                <div className='grid grid-cols-2 mb-4 px-3'>
                                    <p className="font-semibold">{group.groupName}</p>
                                    <div className="font-semibold">
                                        <p className="text-green-600"><span>Scored:</span> {group.scored}</p>
                                        <p className="text-red-600"><span>Not Scored:</span> {group.amountNotScored}</p>
                                    </div>
                                </div>
                                <Table
                                    rowKey="registrationId"
                                    columns={columns}
                                    dataSource={dataSource}
                                    pagination={false}
                                    loading={false}
                                />
                            </div>
                        </>
                    )
                })
            )}
        </>
    )
}

export default ScoreKoi