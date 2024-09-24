import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Popconfirm, Table, Tag, Typography } from 'antd';
import React from 'react'

const StaffManagement = () => {

  const columns = [
    // User ID
    {
      title: "User ID",
      key: "user-id",
      dataIndex: "user_id",
    },
    // name
    {
      title: "Full Name",
      key: "full-name",
      dataIndex: "name",
    },
    // Birthday
    {
      title: "Birthday",
      key: "User-birthday",
      dataIndex: "birthday",
    },
    // phone
    {
      title: "Phone",
      key: "user-phone",
      dataIndex: "phone",
    },
    // Email
    {
      title: "Email",
      key: "user-email",
      dataIndex: "email",
    },
    // Gender
    {
      title: "Gender",
      key: "user-gender",
      dataIndex: "gender",
      render: (_, { gender }) => {
        return gender ? <Tag>Male</Tag> : <Tag>Female</Tag>;
      },
    },
    // status
    {
      title: "Status",
      key: "user-status",
      dataIndex: "Status",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                alert(record.user_id)
              }}
              loading={false}
            >
              <EditOutlined />
            </Button>

            <Popconfirm
              title="Delete user"
              description="Are you sure to block this staff?"
              onConfirm={() => { alert(record.user_id) }}
              onCancel={() => { }}
              placement="left"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger disabled={false}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const dataSource = [];

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
              title: "Staff Management",
              href: "",
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
          onClick={() => {
            alert('open add modal');
          }}
        >
          <UserAddOutlined />
        </Button>
      </div>

      <h3 className="font-medium text-3xl mb-3">List Staff</h3>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={true}
        loading={false}
      />
    </>
  )
}

export default StaffManagement
