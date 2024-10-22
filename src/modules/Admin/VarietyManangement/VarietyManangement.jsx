import { Alert, Breadcrumb, Button, message, Popconfirm, Spin, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { PATH } from '../../../routes/path'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { varietyApi } from '../../../apis/variety.api';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useOpenModal } from '../../../hooks/useOpenModal';
import AddVarietyModal from './AddVarietyModal';
import EditVarietyModal from './EditVarietyModal';

export const validCountries = ["Japan", "Germany"];

const VarietyManangement = () => {

  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [dataEdit, setDataEdit] = useState({});

  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();
  const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();

  const handleCloseEditModal = () => {
    closeEditModal();
    setDataEdit({});
  }

  // dataListVariety
  const { data: dataListVariety, isLoading, error } = useQuery({
    queryKey: ["list-variety"],
    queryFn: () => varietyApi.getAllVariety(),
  });

  // handleAddVarietyApi
  const { mutate: handleAddVarietyApi, isPending: isPendingAdd } = useMutation({
    mutationFn: (payload) => varietyApi.postAddVariety(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Add Variety successfully",
        type: "success",
        duration: 3,
      });
      closeAddModal();
      queryClient.refetchQueries({
        queryKey: ["list-variety"],
        type: "active",
      });
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // handleUpdateVarietyApi
  const { mutate: handleUpdateVarietyApi, isPending: isPendingUpdate } = useMutation({
    mutationFn: (payload) => varietyApi.putUpdateKoiByUser(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Update Variety successfully",
        type: "success",
        duration: 3,
      });
      handleCloseEditModal();
      queryClient.refetchQueries({
        queryKey: ["list-variety"],
        type: "active",
      });
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });


  // handleDeleteVarietyApi
  const { mutate: handleDeleteVarietyApi, isPending: isPendingDelete } = useMutation({
    mutationFn: (id) => varietyApi.deleteVariety(id),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Delete Variety successfully",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["list-variety"],
        type: "active",
      });
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const columns = [
    // varietyId
    {
      title: "ID",
      width: 80,
      key: "variety-id",
      dataIndex: "varietyId",
      sorter: {
        compare: (a, b) => a.varietyId - b.varietyId,
        multiple: 4,
      },
    },
    // name
    {
      title: "Name",
      key: "variety-name",
      dataIndex: "varietyName",
      sorter: {
        compare: (a, b) => a.varietyName.length - b.varietyName.length,
        multiple: 4,
      },
    },
    // Origin
    {
      title: "Origin",
      key: "variety-origin",
      dataIndex: "varietyOrigin",
      filters: [
        { text: "Japan", value: "Japan" },
        { text: "Germany", value: "Germany" },
      ],
      onFilter: (value, record) => record.varietyOrigin === value,
    },
    // Status
    // {
    //   title: "Status",
    //   width: 200,
    //   key: "variety-status",
    //   dataIndex: "varietyStatus",
    //   filters: [
    //     { text: "Active", value: true },
    //     { text: "Inactive", value: false },
    //   ],
    //   onFilter: (value, record) => record.varietyStatus === value,
    //   render: (status) => {
    //     return status ? (
    //       <Tag icon={<CheckCircleOutlined />} color="success">Active</Tag>
    //     ) : (
    //       <Tag icon={<CloseCircleOutlined />} color="error">Inactive</Tag>
    //     );
    //   },
    // },
    // Action
    {
      title: "Action",
      width: 300,
      key: "action",
      render: (record) => {
        return (
          <div className="flex">
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                setDataEdit(record);
                openEditModal();
              }}
              loading={false}
            >
              <EditOutlined />
            </Button>

            <Popconfirm
              title="Delete variety"
              description="Are you sure to delete this?"
              onConfirm={() => { handleDeleteVarietyApi(record.varietyId) }}
              onCancel={() => { }}
              placement="top"
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

  const dataSource = dataListVariety || [];

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
              title: "Variety Management",
              href: PATH.ADMIN_VARIETY,
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
          onClick={() => {
            openAddModal()
          }}
        >
          <PlusSquareOutlined />
        </Button>
      </div>

      <h3 className="font-medium text-3xl mb-3">List Variety</h3>
      <Table
        rowKey="varietyId"
        columns={columns}
        dataSource={dataSource}
        pagination={true}
        loading={isLoading}
      />

      <AddVarietyModal
        key={'adding'}
        isOpen={isOpenAddModal}
        onCloseModal={closeAddModal}
        handleAddVarietyApi={handleAddVarietyApi}
        isPending={isPendingAdd}
      />

      <EditVarietyModal
        key={'editting'}
        data={dataEdit}
        isOpen={isOpenEditModal}
        onCloseModal={handleCloseEditModal}
        handleUpdateVarietyApi={handleUpdateVarietyApi}
        isPending={isPendingUpdate}
      />

    </>
  )
}

export default VarietyManangement