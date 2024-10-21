import React from 'react'
import { PATH } from '../../../routes/path'
import { Breadcrumb } from 'antd'

const RefereeManagement = () => {
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
              title: "Referee Management",
              href: PATH.STAFF_REFEREE,
            },
          ]}
        />
      </div>
    </>
  )
}

export default RefereeManagement