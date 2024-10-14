import { Breadcrumb } from 'antd'
import React from 'react'
import { PATH } from '../../../../routes/path'
import { useQuery } from '@tanstack/react-query';
import InprocessTable from './InprocessTable';
import ScoredTable from './ScoredTable';
import { registrationApi } from '../../../../apis/registration.api';

const MyRegPage = () => {

    // dataSourceProcessing
    const { data: dataSourceProcessing, isLoading: isLoadingProcess } = useQuery({
        queryKey: ["list-processing"],
        queryFn: () => registrationApi.getListRegByUser('inprocess'),
    });

    // dataSourceScored
    const { data: dataSourceScored, isLoading: isLoadingScored } = useQuery({
        queryKey: ["list-scored"],
        queryFn: () => registrationApi.getListRegByUser('scored'),
    });

    return (
        <>
            <div className="flex items-center justify-between mb-2">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: "Dashboard",
                        },
                        {
                            title: "My Registration",
                            href: PATH.PROFILE_MY_REG,
                        },
                    ]}
                />
            </div>

            <div className='space-y-3'>
                <InprocessTable
                    dataSource={dataSourceProcessing}
                    isLoading={isLoadingProcess}
                />

                <ScoredTable
                    dataSource={dataSourceScored}
                    isLoading={isLoadingScored}
                />
            </div>

        </>
    )
}

export default MyRegPage