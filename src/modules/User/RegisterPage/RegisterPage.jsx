import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { koiApi } from '../../../apis/koi.api';
import { Alert, Button, Col, Form, Image, Input, message, Popconfirm, Row, Select, Table, Typography, Upload } from 'antd';
import { DeleteOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { PATH } from '../../../routes/path';
import 'animate.css';
import { Controller, useForm } from 'react-hook-form';
import { showApi } from '../../../apis/show.api';
import { convertToEmbedUrl } from '../../../utils';
import { registrationApi } from '../../../apis/registration.api';

const RegisterPage = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [messageApi, contextHolder] = message.useMessage();

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

  // dataListVariety
  const { data: dataListVariety, isLoading: isLoadingVariety } = useQuery({
    queryKey: ["list-variety"],
    queryFn: () => showApi.getKoiVariety(),
    enabled: !!idKoi,
  });

  // handleCreateReg
  const { mutate: handleCreateReg, isPending: isPendingCreate } = useMutation({
    mutationFn: (payload) => registrationApi.postRegistration(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Create successfully",
        type: "success",
        duration: 3,
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

  const [totalImg, setTotalImg] = useState(3);
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState(undefined);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      size: undefined,
      variety: undefined,
      description: "",
      image1: undefined,
      image2: undefined,
      image3: undefined,
      video: "",
    },
    // resolver: yupResolver(schema),
    // criteriaMode: "all",
  });

  useEffect(() => {
    if (dataKoi) {
      setValue("name", dataKoi?.koiName);
      setValue("size", dataKoi?.koiSize);
      setValue("variety", dataKoi?.varietyId);
      setValue("description", dataKoi?.koiDesc);
    }
  }, [dataKoi, setValue]);

  const handleChange = ({ fileList }) => {
    if (fileList.length <= 3) {
      setFileList(fileList);

      // Đọc và lưu URL của từng ảnh, sau đó cập nhật form state
      const newUrls = [];
      fileList.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newUrls.push(e.target.result);
          setImageUrls(newUrls);

          // Cập nhật từng trường image1, image2, image3 theo thứ tự
          setValue(`image${index + 1}`, file.originFileObj);
        };
        reader.readAsDataURL(file.originFileObj);
      });

      setTotalImg(3 - fileList.length); // Cập nhật số lượng ảnh còn lại
    }
  };

  const handleDelete = (index) => {
    const updatedFileList = fileList.filter((_, i) => i !== index);
    const updatedImageUrls = imageUrls.filter((_, i) => i !== index);

    setFileList(updatedFileList);
    setImageUrls(updatedImageUrls);
    setTotalImg(totalImg + 1); // Tăng số ảnh còn lại khi xóa một ảnh

    // Xóa ảnh tương ứng và cập nhật các trường image1, image2, image3
    updatedFileList.forEach((file, i) => {
      setValue(`image${i + 1}`, file.originFileObj); // Đặt giá trị file
    });

    // Đảm bảo các trường còn lại không có giá trị khi không có ảnh
    for (let i = updatedFileList.length; i < 3; i++) {
      setValue(`image${i + 1}`, undefined);
    }
  };


  const onSubmit = (values) => {
    const payload = new FormData();

    payload.append("ShowId", showId);
    payload.append("KoiId", dataKoi?.koiID);
    payload.append("Size", values.size);
    payload.append("Image1", values.image1);
    payload.append("Image2", values.image2);
    payload.append("Image3", values.image3);
    payload.append("Video", convertToEmbedUrl(values.video));
    payload.append("Description", values.description);
    // payload.append("Name", values.name);
    // payload.append("VarietyId", values.variety);

    // for (let [key, value] of payload.entries()) {
    //   console.log(`${key}:`, value);
    // }

    handleCreateReg(payload);
  };

  return (
    <>
      {contextHolder}
      {/* className={`${dropdownReg ? 'hidden' : 'block'}`} */}
      <div className={`${dropdownReg ? 'hidden' : 'block'} container mx-auto my-5 space-y-4 min-h-[500px]`}>
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
      <div className={`${dropdownReg ? 'block animate__animated animate__fadeInDown' : 'hidden'} container mx-auto my-5`}>
        <h1 className='text-black text-3xl font-bold text-center'>Register for {showName}</h1>

        <h2 className='text-center text-xl text-red-600 font-semibold'>
          Register here and pay $5 for each registration. You can add to cart and checkout all at once or checkout individually. Contact us for assistance!
        </h2>

        <div className='mt-4 bg-gray-100 rounded-md p-8'>
          <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
            <Row gutter={[48, 16]}>
              {/* Name */}
              <Col span={24}>
                <label className="text-base text-black">
                  <span className="text-red-600">* </span>
                  Koi Name:
                </label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        readOnly
                        type="text"
                        size="large"
                        className="mt-1"
                        placeholder="Please enter your Koi name..."
                        status={errors.name ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.name && (
                  <span className="mt-1 text-base text-red-500">
                    {" "}
                    {errors.name.message}
                  </span>
                )}
              </Col>

              {/* Size */}
              <Col span={12}>
                <label className="text-base text-black">
                  <span className="text-red-600">* </span>
                  Koi Size (cm):
                </label>
                <Controller
                  name="size"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="number"
                        size="large"
                        className="mt-1"
                        placeholder="Please enter your Koi size..."
                        status={errors.size ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.size && (
                  <span className="mt-1 text-base text-red-500">
                    {" "}
                    {errors.size.message}
                  </span>
                )}
              </Col>

              {/* Variety */}
              <Col span={12}>
                <label className="text-base text-black">
                  <span className="text-red-600">* </span>
                  Koi Variety:
                </label>
                <Controller
                  name="variety"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        {...field}
                        size="large"
                        className="mt-1 w-full"
                        placeholder="Please select your Koi variety..."
                        allowClear
                        disabled
                        defaultValue={dataKoi?.varietyId}
                        status={errors.variety ? "error" : ""}
                        loading={isLoadingVariety}
                        options={
                          dataListVariety?.map(variety => ({
                            label: variety.varietyName,
                            value: variety.varietyId,
                          })) || []
                        }
                      />
                    );
                  }}
                />
                {errors?.variety && (
                  <span className="mt-1 text-base text-red-500">
                    {" "}
                    {errors.variety.message}
                  </span>
                )}
              </Col>

              {/* description */}
              <Col span={24}>
                <label className="text-base text-black">
                  <span className="text-red-600">* </span>
                  Koi Description:
                </label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input.TextArea
                        {...field}
                        rows={5}
                        size="large"
                        className="mt-1"
                        placeholder="Please write something about your Koi..."
                        status={errors.description ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.description && (
                  <span className="mt-1 text-base text-red-500">
                    {" "}
                    {errors.description.message}
                  </span>
                )}
              </Col>

              {/* images */}
              <Col span={24} className='flex flex-col justify-center items-start'>
                <label className="text-base text-black mb-2">
                  <p>
                    <span className="text-red-600">* </span>
                    Koi Images ({totalImg}):
                  </p>
                  <p className="text-red-600">
                    (Vertical photo preferred and larger photos are recommended,
                    jpg or png files accepted. Up to 3 images allowed.)
                  </p>
                </label>

                <div className='flex items-start justify-center space-x-4'>
                  <Upload
                    name="image"
                    listType="picture-card"
                    className={`avatar-uploader`}
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false} // Prevent auto upload
                    showUploadList={false}
                  >
                    {totalImg > 0 && (
                      <button style={{ border: 0, background: "none" }} type="button">
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </button>
                    )}
                  </Upload>

                  {imageUrls?.map((url, index) => (
                    <div className='relative inline-block' key={index}>
                      <Image width={100} height={100} src={url} />
                      <DeleteOutlined
                        onClick={() => handleDelete(index)}
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          fontSize: '18px',
                          color: '#f5222d',
                          cursor: 'pointer',
                          borderRadius: '50%',
                          padding: '2px',
                          boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
                        }}
                      />
                    </div>
                  ))}

                </div>





                {/* {errors.image && (
                  <span className="mt-1 text-base text-red-500">
                    {errors.image.message}
                  </span>
                )} */}

              </Col>

              {/* video */}
              <Col span={24}>
                <label className="text-base text-black">
                  <p>
                    <span className="text-red-600">* </span>
                    Koi Video:
                  </p>
                  <p className="text-red-600">(Example: https://www.youtube.com/...)</p>
                </label>
                <Controller
                  name="video"
                  control={control}
                  render={({ field }) => {
                    return (
                      <Input
                        {...field}
                        type="text"
                        size="large"
                        className="mt-1"
                        placeholder="Please enter your youtube video url..."
                        status={errors.video ? "error" : ""}
                      />
                    );
                  }}
                />
                {errors?.video && (
                  <span className="mt-1 text-base text-red-500">
                    {" "}
                    {errors.video.message}
                  </span>
                )}
              </Col>

              <Col span={24} className="flex justify-end">
                <Button
                  loading={false}
                  htmlType="submit"
                  size="large"
                  type="default"
                  className="ml-3"
                >
                  Register more?
                </Button>
                <Button
                  loading={false}
                  htmlType="submit"
                  size="large"
                  type="primary"
                  className="ml-3"
                >
                  Check out
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

      </div>

    </>
  )
}

export default RegisterPage