import { Breadcrumb } from 'antd'
import React from 'react'
import { PATH } from '../../../../routes/path'
import InprocessTable from './InprocessTable';
import ScoredTable from './ScoredTable';

const MyRegPage = () => {



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
                <InprocessTable />
                <ScoredTable />
            </div>

        </>
    )
}

export default MyRegPage