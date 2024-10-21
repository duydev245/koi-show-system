import { Breadcrumb } from 'antd'
import React from 'react'
import { PATH } from '../../../routes/path'

const DashBoardAdmin = () => {
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
              title: "Dashboard & Statistics",
              href: PATH.ADMIN_DASHBOARD,
            },
          ]}
        />
      </div>
    </>
  )
}

export default DashBoardAdmin