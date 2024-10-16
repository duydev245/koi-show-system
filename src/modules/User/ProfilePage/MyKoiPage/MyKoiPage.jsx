import { Alert, Breadcrumb, Button, message, Popconfirm, Skeleton, Table, Typography } from 'antd'
import React, { useState } from 'react'
import { PATH } from '../../../../routes/path'
import { koiApi } from '../../../../apis/koi.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useOpenModal } from '../../../../hooks/useOpenModal';
import AddKoiModal from './AddKoiModal';
import EditKoiModal from './EditKoiModal';
import { showApi } from '../../../../apis/show.api';

const MyKoiPage = () => {

  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();
  const [idEdit, setIdEdit] = useState(undefined);

  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();
  const { isOpen: isOpenEditModal, openModal: openEditModal, closeModal: closeEditModal } = useOpenModal();

  const handleCloseEditModal = () => {
    closeEditModal();
    setIdEdit(undefined);
  }

  // dataListKoi
  const { data: dataListKoi, isLoading: isLoadingListKoi } = useQuery({
    queryKey: ["list-koi"],
    queryFn: () => koiApi.getListKoiByUser(),
  });

  // dataListVariety
  const { data: dataListVariety, isLoading: isLoadingVariety } = useQuery({
    queryKey: ["list-variety"],
    queryFn: () => showApi.getKoiVariety(),
  });

  // dataKoi
  const { data: dataKoi, isLoading: isLoadingKoi } = useQuery({
    queryKey: ["data-koi"],
    queryFn: () => koiApi.getKoiDetails(idEdit),
    enabled: !!idEdit,
  });

  // handleAddKoiApi
  const { mutate: handleAddKoiApi, isPending: isPendingAdd } = useMutation({
    mutationFn: (payload) => koiApi.addKoiByUser(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Add Koi successfully",
        type: "success",
        duration: 3,
      });
      closeAddModal();
      queryClient.refetchQueries({
        queryKey: ["list-koi"],
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

  // handleUpdateKoiApi
  const { mutate: handleUpdateKoiApi, isPending: isPendingUpdate } = useMutation({
    mutationFn: (payload) => koiApi.updateKoiByUser(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Update Koi successfully",
        type: "success",
        duration: 3,
      });
      handleCloseEditModal();
      queryClient.refetchQueries({
        queryKey: ["list-koi"],
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

  // handleDeleteKoiApi
  const { mutate: handleDeleteKoiApi, isPending: isPendingDelete } = useMutation({
    mutationFn: (id) => koiApi.deleteKoiByUser(id),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Delete Koi successfully",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["list-koi"],
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
    // Koi ID
    {
      title: "ID",
      key: "koi-id",
      dataIndex: "koiID",
      width: 80,
      sorter: {
        compare: (a, b) => a.koiID - b.koiID,
        multiple: 4,
      },
    },
    // Koi Image
    {
      title: "Image",
      key: "koi-image",
      width: 250,
      render: (record) => {
        return isLoadingListKoi ? (
          <Skeleton.Image
            active
            style={{ width: 200, height: 300 }}
          />
        ) : (
          record.koiImg && (
            <img
              src={record.koiImg}
              alt={record.koiName}
              className="w-[200px] rounded-sm object-cover"
            />
          )
        );
      },
    },
    // Koi Name
    {
      title: "Name",
      key: "koi-name",
      dataIndex: "koiName",
      sorter: {
        compare: (a, b) => a.koiName.length - b.koiName.length,
        multiple: 4,
      },
    },
    // Koi Size
    {
      title: "Size",
      key: "koi-size",
      dataIndex: "koiSize",
      sorter: {
        compare: (a, b) => a.koiSize - b.koiSize,
        multiple: 4,
      },
      render: (record) => {
        return (
          <Typography className='text-start'>
            {record} cm
          </Typography>
        )
      }
    },
    // Koi Variety
    {
      title: "Variety",
      key: "koi-variety",
      dataIndex: "koiVariety",
      sorter: {
        compare: (a, b) => a.koiVariety.length - b.koiVariety.length,
        multiple: 4,
      },
    },
    // Action
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <div className='flex items-center justify-center'>
            <Button
              type="primary"
              className="mr-2"
              onClick={() => {
                setIdEdit(record.koiID);
                openEditModal();
              }}
              loading={false}
            >
              <EditOutlined />
            </Button>

            <Popconfirm
              title="Delete Koi"
              description="Are you sure to delete this koi?"
              onConfirm={() => {
                handleDeleteKoiApi(record.koiID)
              }}
              onCancel={() => { }}
              placement="right"
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger disabled={isPendingDelete}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ]

  const dataSource = dataListKoi || [];

  return (
    <>
      {contextHolder}
      <div className="flex items-center justify-between mb-2 h-11">
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

        <Button
          type="primary"
          size='large'
          onClick={openAddModal}
          loading={false}
        >
          <PlusSquareOutlined />
        </Button>

      </div>

      {dataSource && dataSource.length > 0 ? (
        <Table
          rowKey="koiID"
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          loading={isLoadingListKoi}
          scroll={{ y: 700 }}
        />
      ) : (
        <Alert
          message="Notification"
          description="You have not registered any Koi."
          type="info"
          showIcon
        />
      )}

      <AddKoiModal
        key={'adding-koi-modal'}
        isOpen={isOpenAddModal}
        onCloseModal={closeAddModal}
        isPending={isPendingAdd}
        handleAddKoiApi={handleAddKoiApi}
        dataListVariety={dataListVariety}
        isLoadingVariety={isLoadingVariety}
      />

      <EditKoiModal
        key={'editting-koi-modal'}
        data={dataKoi}
        isOpen={isOpenEditModal}
        onCloseModal={handleCloseEditModal}
        isLoading={isLoadingKoi}
        isPending={isPendingUpdate}
        handleUpdateKoiApi={handleUpdateKoiApi}
        dataListVariety={dataListVariety}
        isLoadingVariety={isLoadingVariety}
      />
    </>
  )
}

export default MyKoiPage