import { Breadcrumb } from 'antd'
import React from 'react'
import { PATH } from '../../../../routes/path'

const MyKoiPage = () => {
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
              title: "My Koi",
              href: PATH.PROFILE_MY_KOI,
            },
          ]}
        />
      </div>
    </>
  )
}

export default MyKoiPage