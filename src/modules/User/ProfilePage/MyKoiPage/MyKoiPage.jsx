import { Breadcrumb, Button, message, Popconfirm, Skeleton, Table, Typography } from 'antd'
import React from 'react'
import { PATH } from '../../../../routes/path'
import { koiApi } from '../../../../apis/koi.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { useOpenModal } from '../../../../hooks/useOpenModal';
import AddKoiModal from './AddKoiModal';

const MyKoiPage = () => {

  const queryClient = useQueryClient();
  const [messageApi, contextHolder] = message.useMessage();

  const { isOpen: isOpenAddModal, openModal: openAddModal, closeModal: closeAddModal } = useOpenModal();

  // dataListKoi
  const { data: dataListKoi, isLoading: isLoadingListKoi } = useQuery({
    queryKey: ["list-koi"],
    queryFn: () => koiApi.getListKoiByUser(),
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
                alert(record.koiID)
              }}
              loading={false}
            >
              <EditOutlined />
            </Button>

            <Popconfirm
              title="Delete Koi"
              description="Are you sure to delete this koi?"
              onConfirm={() => { alert(record.koiID) }}
              onCancel={() => { }}
              placement="right"
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

      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        loading={isLoadingListKoi}
        scroll={{ y: 700 }}
      />

      <AddKoiModal
        isOpen={isOpenAddModal}
        onCloseModal={closeAddModal}
        isPending={isPendingAdd}
        handleAddKoiApi={handleAddKoiApi}
      />
    </>
  )
}

export default MyKoiPage