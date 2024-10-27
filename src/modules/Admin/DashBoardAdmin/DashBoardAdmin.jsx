import { Breadcrumb } from 'antd'
import React from 'react'
import { PATH } from '../../../routes/path'
import RevenueShow from './RevenueShow'
import QuantityShow from './QuantityShow'
import QuantityVariety from './QuantityVariety'

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

      <div className="mb-5">
        <h3 className="font-medium text-3xl mb-3">Revenue of each show:</h3>
        <RevenueShow />
      </div>

      <div className="mb-5">
        <h3 className="font-medium text-3xl mb-3">Total registration of each show:</h3>
        <QuantityShow />
      </div>

      <div className="mb-5">
        <h3 className="font-medium text-3xl mb-3">Quantity Distribution by Variety:</h3>
        <QuantityVariety />
      </div>


    </>
  )
}

export default DashBoardAdmin