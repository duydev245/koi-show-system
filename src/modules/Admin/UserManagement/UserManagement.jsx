import { Alert, Breadcrumb, Button, Input, message, Pagination, Popconfirm, Table, Tag, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { PATH } from '../../../routes/path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, UserAddOutlined, UserDeleteOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { userApi } from '../../../apis/user.api';
import dayjs from "dayjs";
import AddUserModal from './AddUserModal';

const UserManagement = () => {

    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalSize, setTotalSize] = useState(100);

    const [filteredData, setFilteredData] = useState([]);

    const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();

    // dataListUser
    const { data: dataListUser, isLoading, error } = useQuery({
        queryKey: ["list-user", { currentPage }],
        queryFn: () => userApi.getListUser({ pageIndex: currentPage }),
    });

    // dataListRole
    const { data: dataListRole, isLoading: isLoadingRole } = useQuery({
        queryKey: ["list-role"],
        queryFn: () => userApi.getListRole(),
        enabled: isOpenAddModal,
    });

    // handleAddUserApi
    const { mutate: handleAddUserApi, isPending: isPendingAdd } = useMutation({
        mutationFn: (payload) => userApi.postCreateUser(payload),
        onSuccess: (data) => {
            messageApi.open({
                content: data?.message || "Create User successfully",
                type: "success",
                duration: 3,
            });
            closeAddModal();
            queryClient.refetchQueries({
                queryKey: ["list-user", { currentPage }],
                type: "active",
            });
        },
        onError: (error) => {
            messageApi.open({
                content: "Not connect to network....",
                type: "error",
                duration: 3,
            });
        },
    });

    // handleChangeStatusApi
    const { mutate: handleChangeStatusApi, isPending: isPendingChanging } = useMutation({
        mutationFn: (payload) => userApi.putChangeStatusUser(payload),
        onSuccess: (data) => {
            messageApi.open({
                content: data?.message || "Change Status successfully",
                type: "success",
                duration: 3,
            });
            queryClient.refetchQueries({
                queryKey: ["list-user", { currentPage }],
                type: "active",
            });
        },
        onError: (error) => {
            messageApi.open({
                content: "Not connect to network....",
                type: "error",
                duration: 3,
            });
        },
    });

    const columns = [
        // ID
        {
            title: 'ID',
            width: 60,
            key: 'id',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 1,
            },
        },
        // Name
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: {
                compare: (a, b) => a.name.length - b.name.length,
                multiple: 2,
            },
        },
        // Email
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            sorter: {
                compare: (a, b) => a.email.length - b.email.length,
                multiple: 3,
            },
        },
        // phone
        {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone',
            sorter: {
                compare: (a, b) => a.phone.length - b.phone.length,
                multiple: 4,
            },
        },
        // dateOfBirth
        {
            title: 'Date of Birth',
            key: 'dateOfBirth',
            dataIndex: 'dateOfBirth',
            sorter: {
                compare: (a, b) => dayjs(a.dateOfBirth).year() - dayjs(b.dateOfBirth).year(),
                multiple: 5,
            },
            render: (date) => {
                return <Typography>{dayjs(date).format('DD/MM/YYYY')}</Typography>;
            },
        },
        // gender
        {
            title: 'Gender',
            width: 100,
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Male', value: true },
                { text: 'Female', value: false },
            ],
            onFilter: (value, record) => record.gender === value,
            render: (gender) =>
                gender ? (
                    <Tag color="blue">Male</Tag>
                ) : (
                    <Tag color="magenta">Female</Tag>
                ),
        },
        // role
        {
            title: 'Role',
            width: 100,
            key: 'role',
            dataIndex: 'role',
            filters: [
                { text: 'Manager', value: 'manager' },
                { text: 'Staff', value: 'staff' },
                { text: 'Referee', value: 'referee' },
                { text: 'Member', value: 'member' },
            ],
            onFilter: (value, record) => record.role.toLowerCase() === value,
            render: (role) => {

                const roleName = role.trim().toLowerCase();

                return (
                    <>
                        {
                            roleName === 'manager' && (
                                <Tag color="red">{role}</Tag>
                            )
                        }

                        {
                            roleName === 'staff' && (
                                <Tag color="volcano">{role}</Tag>
                            )
                        }

                        {
                            roleName === 'referee' && (
                                <Tag color="blue">{role}</Tag>
                            )
                        }

                        {
                            roleName === 'member' && (
                                <Tag color="purple">{role}</Tag>
                            )
                        }
                    </>
                )
            }
        },
        // status
        {
            title: 'Status',
            width: 100,
            key: 'status',
            dataIndex: 'status',
            filters: [
                { text: 'Active', value: true },
                { text: 'Inactive', value: false },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) =>
                status ? (
                    <Tag color="success" icon={<CheckCircleOutlined />}>Active</Tag>
                ) : (
                    <Tag color="error" icon={<CloseCircleOutlined />}>Inactive</Tag>
                ),
        },
        // actions
        {
            title: "Actions",
            key: "action",
            render: (record) => {

                const roleName = record.role.trim().toLowerCase();

                if (roleName === 'manager') {
                    return null;
                }
                
                return (
                    <div className="flex">
                        {record.status ? (
                            <>
                                <Popconfirm
                                    title="Block user"
                                    description="Are you sure to block this user?"
                                    onConfirm={() => { handleChangeStatusApi({ id: record.id, status: false }) }}
                                    onCancel={() => { }}
                                    placement="top"
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary" danger disabled={isPendingChanging}>
                                        Block
                                    </Button>
                                </Popconfirm>
                            </>
                        ) : (
                            <>
                                <Button
                                    type="primary"
                                    className="mr-2"
                                    onClick={() => {
                                        handleChangeStatusApi({ id: record.id, status: true })
                                    }}
                                    loading={isPendingChanging}
                                >
                                    Unblock
                                </Button>
                            </>
                        )
                        }

                    </div>
                );
            },
        },
    ];

    useEffect(() => {
        if (dataListUser) {
            setTotalSize(dataListUser?.totalItems);
            setFilteredData(dataListUser?.users);
        }
    }, [dataListUser, setTotalSize]);

    const handleSearch = (event) => {
        const value = event.target.value;

        const filtered = dataListUser?.users.filter((user) =>
            user.name.trim().toLowerCase().includes(value.trim().toLowerCase())
        );
        setFilteredData(filtered);
    };

    if (error) {
        return (
            <Alert
                message="Warning"
                description="Something went wrong..."
                type="warning"
                showIcon
            />
        );
    }

    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-between">
                <Breadcrumb
                    separator=">"
                    items={[
                        {
                            title: "Dashboard",
                        },
                        {
                            title: "User Management",
                            href: PATH.ADMIN_USER,
                        },
                    ]}
                />

                <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                        openAddModal();
                    }}
                >
                    <UserAddOutlined />
                </Button>
            </div>


            <h3 className="font-medium text-3xl mb-3">Manage User</h3>

            <Input
                placeholder="Search by name"
                allowClear
                onChange={handleSearch}
                className='mb-4 w-1/3'
            />

            <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredData}
                pagination={false}
                loading={isLoading}
            />

            <Pagination
                className='m-2'
                align="end"
                total={totalSize}
                simple
                pageSize={10}
                current={currentPage}
                onChange={(page) => {
                    setCurrentPage(page);
                }}
                showSizeChanger={false}
            />

            <AddUserModal
                key={'adding-user'}
                isOpen={isOpenAddModal}
                onCloseModal={closeAddModal}
                dataListRole={dataListRole}
                isLoadingRole={isLoadingRole}
                handleAddUserApi={handleAddUserApi}
                isPending={isPendingAdd}
            />
        </>
    )
}

export default UserManagement