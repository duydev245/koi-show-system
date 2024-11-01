import { Alert, Breadcrumb, Button, message, Pagination, Table, Tag, Typography } from 'antd'
import React, { useState } from 'react'
import { PATH } from '../../../routes/path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useOpenModal } from '../../../hooks/useOpenModal';
import { registrationApi } from '../../../apis/registration.api';
import { PAGE_SIZE } from '../../../constants';
import { FormOutlined, SyncOutlined } from '@ant-design/icons';
import EvaluateModal from './EvaluateModal';
import ContactModal from './ContactModal';

const ApplicationManagement = () => {

  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [dataEvaluate, setDataEvaluate] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [dataContact, setDataContact] = useState('');

  const { isOpen: isOpenEvaluateModal, openModal: openEvaluateModal, closeModal: closeEvaluateModal } = useOpenModal();
  const { isOpen: isOpenContactModal, openModal: openContactModal, closeModal: closeContactModal } = useOpenModal();

  const handleCloseEvaluateModal = () => {
    closeEvaluateModal();
    setDataEvaluate({});
  }

  const handleCloseContactModal = () => {
    closeContactModal();
    setDataContact('');
  }

  // dataListPendingRegistration
  const { data: dataListReg, isLoading, error } = useQuery({
    queryKey: ["list-reg", { currentPage }],
    queryFn: () => registrationApi.getPendingRegList({ pageIndex: currentPage }),
  });

  // handleEvaluateApi
  const { mutate: handleEvaluateApi, isPending: isPendingEvaluate } = useMutation({
    mutationFn: (payload) => registrationApi.putEvaluateReg(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Evaluate registration successfully",
        type: "success",
        duration: 3,
      });
      handleCloseEvaluateModal();
      queryClient.refetchQueries({
        queryKey: ["list-reg", { currentPage }],
        type: "active",
      });
    },
    onError: (error) => {
      messageApi.open({
        content: "Waiting...",
        type: "error",
        duration: 3,
      });
    },
  });

  const columns = [
    // id
    {
      title: "ID",
      width: 80,
      key: "reg-id",
      dataIndex: "id",
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    // name
    {
      title: "Name",
      key: "reg-name",
      dataIndex: "name",
      sorter: {
        compare: (a, b) => a.name.length - b.name.length,
        multiple: 4,
      },
    },
    // size
    {
      title: "Size",
      key: "reg-size",
      dataIndex: "size",
      sorter: {
        compare: (a, b) => a.size - b.size,
        multiple: 4,
      },
      render: (size) => {
        return (
          <Typography>
            {size} cm
          </Typography>
        )
      },
    },
    // variety
    {
      title: "Variety",
      key: "reg-variety",
      dataIndex: "variety",
    },
    // group
    {
      title: "Group",
      key: "reg-group",
      dataIndex: "group",
    },
    // Status
    {
      title: "Status",
      width: 200,
      key: "reg-status",
      dataIndex: "status",
      render: (status) => {
        return (
          <Tag icon={<SyncOutlined spin />} color="processing">{status}</Tag>
        )
      },
    },
    // Action
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <div className="flex">
            <Button
              type="default"
              className="mr-2"
              onClick={() => {
                setDataContact(record.id);
                openContactModal();
              }}
              loading={false}
            >
              Contact
            </Button>
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                setDataEvaluate(record);
                openEvaluateModal();
              }}
              loading={false}
            >
              Evaluate
            </Button>
          </div>
        );
      },
    },
  ];

  const dataSource = dataListReg?.registrations || [];

  const total = dataListReg?.totalItems || 0;

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
      <div className="flex items-center justify-between mb-2">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "Evaluate Registration",
              href: PATH.STAFF_APLLYCATION,
            },
          ]}
        />
      </div>

      <h3 className="font-medium text-3xl mb-3">Evaluate Registration</h3>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoading}
      />

      <Pagination
        className='m-2'
        align="end"
        total={total}
        simple
        pageSize={PAGE_SIZE}
        current={currentPage}
        onChange={(page) => {
          setCurrentPage(page);
        }}
        showSizeChanger={false}
      />

      <EvaluateModal
        data={dataEvaluate}
        isOpen={isOpenEvaluateModal}
        onCloseModal={handleCloseEvaluateModal}
        handleEvaluateApi={handleEvaluateApi}
        isPending={isPendingEvaluate}
      />

      <ContactModal
        idReg={dataContact}
        isOpen={isOpenContactModal}
        onCloseModal={handleCloseContactModal}
      />
    </>
  )
}

export default ApplicationManagement