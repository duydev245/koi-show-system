import { Breadcrumb } from 'antd'
import React from 'react'
import { PATH } from '../../../routes/path'

const ShowManagement = () => {
    return (
        <>
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
            </div>
        </>
    )
}

export default ShowManagement
