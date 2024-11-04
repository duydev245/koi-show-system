import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import dayjs from "dayjs";
import { Alert, Button, message, Popconfirm, Table, Tag, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'animate.css';
import { registrationApi } from '../../../apis/registration.api';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';
import { useOpenModal } from '../../../hooks/useOpenModal';
import SepayModal from './SepayModal';

const CartPage = () => {

  const [sepayCode, setSepayCode] = useState('');

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isOpen: isOpenSepayModal, openModal: openSepayModal, closeModal: closeSepayModal } = useOpenModal();

  // dataSourceDraft
  const { data: dataSourceDraft, isLoading } = useQuery({
    queryKey: ["list-draft"],
    queryFn: () => registrationApi.getListRegByUser('draft'),
  });

  // handleDeleteApi
  const { mutate: handleDeleteApi, isPending } = useMutation({
    mutationFn: (id) => registrationApi.deleteDrafeReg(id),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Delete successfully",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["list-draft"],
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

  // check isPaid
  const { mutate: handleCheckPayment } = useMutation({
    mutationFn: (payload) => registrationApi.getCheckIsPaid(payload),
    onSuccess: (data) => {
      if (data?.payload === true) {
        messageApi.open({
          content: "Payment successfully completed!",
          type: "success",
          duration: 3,
        });
        setTimeout(() => {
          handleOnCloseModal();
          navigate(PATH.HOME);
        }, 1500)
      }
    },
    // onError: (error) => {
    //   messageApi.open({
    //     content: "Payment failed. Please try again.",
    //     type: "error",
    //     duration: 3,
    //   });
    // },
  });

  const columns = [
    // Registration ID
    {
      title: "Registration ID",
      key: "regist-id",
      dataIndex: "id",
    },
    // Koi name
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
    // Price
    {
      title: "Price",
      key: "fee",
      dataIndex: "entranceFee",
      render: (entranceFee) => {
        return (
          <Typography className='flex justify-between items-center'>
            <span>{entranceFee.toLocaleString()}</span>
            <span>VND</span>
          </Typography>
        );
      },
    },
    // Action
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <Popconfirm
            title="Delete Registration"
            description="Are you sure to delete this registration?"
            onConfirm={() => {
              handleDeleteApi(record.id)
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
              loading={isPending}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>

        );
      },
    },
  ];

  const dataSource = dataSourceDraft || [];
  const totalFee = dataSource.reduce((acc, item) => acc + item.entranceFee, 0);

  const generateSepayLink = (dataSource) => {
    const baseUrl = "https://qr.sepay.vn/img";
    const bank = "MBBank"; // Bank name
    const acc = "00001205984"; // Account number
    const template = "compact";
    const totalAmount = totalFee;
    const description = `KoiShowReg ${dataSource?.map(item => item.id).join(' ')}`;
    const encodedDescription = encodeURIComponent(description);

    // Construct the final QR code link
    return `${baseUrl}?bank=${bank}&acc=${acc}&template=${template}&amount=${totalAmount}&des=${encodedDescription}`;
  };

  const handleOnClick = () => {
    if (dataSource.length == 0) {
      messageApi.open({
        content: "Your cart is empty! Can't using sepay",
        type: "warning",
        duration: 3,
      });
    } else {
      // https://qr.sepay.vn/img?bank=MBBank&acc=00001205984&template=compact&amount=5000&des=KoiShowReg id id
      const qrLink = generateSepayLink(dataSource);
      // console.log("🚀 ~ handleOnClick ~ qrLink:", qrLink)
      setSepayCode(qrLink)
      openSepayModal();
    }
  }

  const handleOnCloseModal = () => {
    closeSepayModal();
    setSepayCode('');
  }

  return (
    <>
      {contextHolder}
      <div className='container mx-auto my-5  min-h-screen'>
        <div className='grid grid-cols-1 space-y-4'>
          <div>
            <h1 className="font-bold text-4xl mb-3">Your cart:</h1>
            {
              dataSource && dataSource.length > 0 ? (
                <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  loading={isLoading}
                />
              ) : (
                <div>
                  <Alert
                    message="Notification"
                    description="Your cart is empty."
                    type="warning"
                    showIcon
                  />
                  <Button
                    size='large'
                    block
                    type="primary"
                    className="mt-3"
                    onClick={() => navigate(PATH.HOME)}
                  >
                    Go to Home
                  </Button>
                </div>
              )
            }

          </div>

          <div className='grid grid-cols-4'>
            <div className='bg-transparent'></div>
            <div className='bg-transparent'></div>
            <div className='bg-transparent'></div>

            <div className='space-y-4'>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Total:</span>
                <span className="text-2xl font-bold">{totalFee.toLocaleString()} VND</span>
              </div>

              <button
                onClick={handleOnClick}
                className='w-full uppercase text-lg text-white font-bold py-3 px-4 bg-gray-600 hover:bg-gray-800 duration-300 transition-all rounded-lg'
              >
                proceed to sepay
              </button>

            </div>
          </div>
        </div>
      </div>

      <SepayModal
        isPending={false}
        sepayCode={sepayCode}
        isOpen={isOpenSepayModal}
        onCloseModal={handleOnCloseModal}
        handleCheckPayment={handleCheckPayment}
      />
    </>
  )
}

export default CartPage