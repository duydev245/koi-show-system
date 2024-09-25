import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
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
      dataIndex: "status",
      render: (_, { status }) => {
        return status ? <Tag icon={<CheckCircleOutlined />} color="success">Active</Tag> : <Tag icon={<CloseCircleOutlined />} color="error">Inactive</Tag>;
      },
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

  const dataSource = [
    {
      user_id: 1,
      name: "John Doe",
      birthday: "1990-01-01",
      phone: "0901234567",
      email: "john.doe@example.com",
      gender: true,
      status: true,
    },
    {
      user_id: 2,
      name: "Jane Smith",
      birthday: "1992-05-15",
      phone: "0912345678",
      email: "jane.smith@example.com",
      gender: false,
      status: false,
    },
    {
      user_id: 3,
      name: "Robert Brown",
      birthday: "1988-03-20",
      phone: "0908765432",
      email: "robert.brown@example.com",
      gender: true,
      status: true,
    },
    {
      user_id: 4,
      name: "Emily Johnson",
      birthday: "1995-07-30",
      phone: "0918765432",
      email: "emily.johnson@example.com",
      gender: false,
      status: false,
    },
    {
      user_id: 5,
      name: "Michael White",
      birthday: "1985-10-25",
      phone: "0909988776",
      email: "michael.white@example.com",
      gender: true,
      status: true,
    },
    {
      user_id: 6,
      name: "Sophia Taylor",
      birthday: "1993-02-12",
      phone: "0911122334",
      email: "sophia.taylor@example.com",
      gender: false,
      status: true,
    },
    {
      user_id: 7,
      name: "Daniel Lee",
      birthday: "1987-11-05",
      phone: "0902233445",
      email: "daniel.lee@example.com",
      gender: true,
      status: false,
    },
    {
      user_id: 8,
      name: "Mia Anderson",
      birthday: "1998-09-09",
      phone: "0912233445",
      email: "mia.anderson@example.com",
      gender: false,
      status: true,
    },
    {
      user_id: 9,
      name: "James Wilson",
      birthday: "1990-12-14",
      phone: "0903344556",
      email: "james.wilson@example.com",
      gender: true,
      status: false,
    },
    {
      user_id: 10,
      name: "Olivia Davis",
      birthday: "1991-04-18",
      phone: "0913344556",
      email: "olivia.davis@example.com",
      gender: false,
      status: true,
    },
  ];


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
