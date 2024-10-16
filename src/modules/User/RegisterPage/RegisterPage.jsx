import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { koiApi } from '../../../apis/koi.api';
import { Alert, Button, Popconfirm, Table, Typography } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';
import { PATH } from '../../../routes/path';
import 'animate.css';

const RegisterPage = () => {

  const navigate = useNavigate();
  const { state } = useLocation();

  const [idKoi, setIdKoi] = useState('');
  const [dropdownReg, setDropdownReg] = useState(false);

  const toggleReg = () => {
    setDropdownReg(!dropdownReg);
  };

  const showId = state?.showId;
  const showName = state?.showName;
  console.log("🚀 ~ RegisterPage ~ showId, showName:", showId, showName);

  useEffect(() => {
    if (!showId) {
      navigate(PATH.HOME);
    }
  }, [showId, navigate]);

  // dataListKoi
  const { data: dataListKoi, isLoading: isLoadingListKoi } = useQuery({
    queryKey: ["list-koi"],
    queryFn: () => koiApi.getListKoiByUser(),
  });

  // dataKoi
  const { data: dataKoi, isLoading: isLoadingKoi } = useQuery({
    queryKey: ["data-koi"],
    queryFn: () => koiApi.getKoiDetails(idKoi),
    enabled: !!idKoi,
  });
  console.log('dataKoi', dataKoi);

  const columns = [
    // Koi Name
    {
      title: "Name",
      key: "koi-name",
      dataIndex: "koiName",
      sorter: {
        compare: (a, b) => a.koiName.length - b.koiName.length,
        multiple: 3,
      },
    },
    // Koi Size
    {
      title: "Size",
      key: "koi-size",
      dataIndex: "koiSize",
      sorter: {
        compare: (a, b) => a.koiSize - b.koiSize,
        multiple: 3,
      },
      render: (record) => {
        return (
          <Typography>
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
        multiple: 3,
      },
    },
    // Action
    {
      title: "Action",
      key: "action",
      render: (record) => {
        return (
          <Popconfirm
            title="Choosing Koi"
            description="Are you sure to choose this koi?"
            onConfirm={() => {
              setIdKoi(record.koiID);
              toggleReg();
            }}
            onCancel={() => { }}
            placement="right"
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size='large' loading={isLoadingKoi}>
              <PlusSquareOutlined />
            </Button>
          </Popconfirm>
        );
      },
    },
  ]

  const dataSource = dataListKoi || [];

  return (
    <>

      {/* className={`${dropdownReg ? 'hidden' : 'block'}`} */}
      <div className={`container mx-auto my-5 space-y-4 `}>
        <h1 className='text-black text-3xl font-bold'>Please choose one of your Koi to register</h1>
        {dataSource && dataSource.length > 0 ? (
          <Table
            rowKey="koiID"
            columns={columns}
            dataSource={dataSource}
            pagination={true}
            loading={isLoadingListKoi}
          />
        ) : (
          <div>
            <Alert
              message="Notification"
              description="You have to register your Koi first."
              type="warning"
              showIcon
            />
            <Button
              size='large'
              block
              type="primary"
              className="mt-3"
              onClick={() => navigate(PATH.PROFILE)}
            >
              Go to Profile
            </Button>
          </div>
        )}
      </div >

      {/*  className={`${dropdownReg ? 'block animate__animated animate__fadeInDown' : 'hidden'}`} */}
      <div className={`container mx-auto my-5`}>
        <h1 className='text-black text-3xl font-bold text-center'>Register for {showName}</h1>

        <h2 className='text-center text-xl text-red-600 font-semibold'>
          Register here and pay $5 for each registration. You can add to cart and checkout all at once or checkout individually. Contact us for assistance!
        </h2>

        <div className='mt-4 bg-gray-100 rounded-md p-8'>
          abc
        </div>

      </div>

    </>
  )
}

export default RegisterPage