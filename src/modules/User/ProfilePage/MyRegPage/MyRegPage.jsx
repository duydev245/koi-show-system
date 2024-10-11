import { Breadcrumb } from 'antd'
import React from 'react'
import { PATH } from '../../../../routes/path'
import { useQuery } from '@tanstack/react-query';
import { koiApi } from '../../../../apis/koi.api';
import InprocessTable from './InprocessTable';
import ScoredTable from './ScoredTable';

const MyRegPage = () => {

    // dataSourceProcessing
    const { data: dataSourceProcessing, isLoading: isLoadingProcess } = useQuery({
        queryKey: ["list-processing"],
        queryFn: () => koiApi.getInprocessKoi(),
    });

    // dataSourceScored
    const { data: dataSourceScored, isLoading: isLoadingScored } = useQuery({
        queryKey: ["list-scored"],
        queryFn: () => koiApi.getScoredKoi(),
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