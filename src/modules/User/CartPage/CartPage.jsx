import { useQuery } from '@tanstack/react-query';
import React from 'react'
import dayjs from "dayjs";
import { Button, Popconfirm, Table, Tag, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'animate.css';
import { registrationApi } from '../../../apis/registration.api';

const CartPage = () => {

  // dataSourceDraft
  const { data: dataSourceDraft, isLoading } = useQuery({
    queryKey: ["list-draft"],
    queryFn: () => registrationApi.getListRegByUser('draft'),
  });

  const feeKoi = 5;

  const columns = [
    // Registration ID
    {
      title: "Registration ID",
      key: "regist-id",
      dataIndex: "id",
    },
    // Show name
    {
      title: "Koi name",
      key: "koi-name",
      dataIndex: "name",
    },
    // Create date
    {
      title: "Created date",
      key: "create_date",
      dataIndex: "createDate",
      render: (date) => {
        return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
      },
    },
    // Show name
    {
      title: "Show name",
      key: "show-name",
      dataIndex: "show",
      render: (_, record) => {
        return (
          <a href={`/show-details/${record.showId}`}>
            {record.show}
          </a>
        );
      },
    },
    {
      title: "Price",
      key: "fee",
      render: () => {
        return <Typography>${feeKoi}</Typography>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Delete Registration"
            description="Are you sure to delete this registration?"
            onConfirm={() => {
              alert(record.id)
            }}
            onCancel={() => { }}
            placement="top"
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              className="mr-2"
              loading={false}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>

        );
      },
    },
  ];

  const dataSource = dataSourceDraft || [];
  const totalFee = dataSource.reduce((acc, item) => acc + feeKoi, 0);
  console.log("🚀 ~ CartPage ~ totalFee:", totalFee)

  return (
    <div className='container mx-auto my-5'>

      <div className='grid grid-cols-1 space-y-4'>
        <div>
          <h1 className="font-bold text-4xl mb-3">Your cart:</h1>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            loading={isLoading}
            scroll={{ y: 700 }}
          />

        </div>

        <div className='grid grid-cols-4'>
          <div className='bg-transparent'></div>
          <div className='bg-transparent'></div>
          <div className='bg-transparent'></div>

          <div className='space-y-4'>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Total:</span>
              <span className="text-2xl font-bold">${totalFee}</span>
            </div>

            <button className='w-full uppercase text-lg text-white font-bold py-3 px-4 bg-gray-600 hover:bg-gray-800 duration-300 transition-all rounded-lg'>proceed to checkout</button>

          </div>
        </div>
      </div>


    </div>
  )
}

export default CartPage