import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Form, Image, Input, message, Modal, Row, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ImageUpload from './ImageUpload'
import { convertToEmbedUrl } from '../../../../utils'

const SubmitAgainModal = (
  {
    data,
    isOpen,
    onCloseModal,
    isPending,
    handleEvaluateApi,
  }
) => {
  // console.log("🚀 ~ data:", data)

  const [imageUrl1, setImageUrl1] = useState(undefined);
  const [imageUrl2, setImageUrl2] = useState(undefined);
  const [imageUrl3, setImageUrl3] = useState(undefined);

  const [imageFile1, setImageFile1] = useState(undefined);
  const [imageFile2, setImageFile2] = useState(undefined);
  const [imageFile3, setImageFile3] = useState(undefined);

  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      size: data?.size || "",
      description: data?.description || "",
      image1: undefined,
      image2: undefined,
      image3: undefined,
      video: "",
    },
    // resolver: yupResolver(schema),
    // criteriaMode: "all",
  });

  useEffect(() => {
    if (data && isOpen) {
      setValue("size", data?.size);
      setValue("description", data?.description);

      setImageUrl1(data?.image1);
      setImageUrl2(data?.image2);
      setImageUrl3(data?.image3);

    } else if (!isOpen) {
      reset();
      setImageUrl1(undefined);
      setImageUrl2(undefined);
      setImageUrl3(undefined);

      setImageFile1(undefined);
      setImageFile2(undefined);
      setImageFile3(undefined);
    }
  }, [data, isOpen, setValue, reset]);

  const onSubmit = (values) => {
    const payload = new FormData();
    let hasChanges = false;

    if (values.size !== data?.size) {
      payload.append("Size", values.size);
      hasChanges = true;
    }

    if (values.description !== data?.description) {
      payload.append("Description", values.description);
      hasChanges = true;
    }

    if (values.video !== '') {
      payload.append("Video", convertToEmbedUrl(values.video));
      hasChanges = true;
    }

    if (imageFile1) {
      payload.append("Image1", imageFile1);
      hasChanges = true;
    }

    if (imageFile2) {
      payload.append("Image2", imageFile2);
      hasChanges = true;
    }

    if (imageFile3) {
      payload.append("Image3", imageFile3);
      hasChanges = true;
    }


    if (hasChanges) {
      payload.append("Id", data?.id);
      // payload.append("Status", "Pending");

      for (let [key, value] of payload.entries()) {
        console.log(`${key}:`, value);
      }

      handleEvaluateApi(payload);
    } else {
      messageApi.open({
        content: "No changes detected, update not required.",
        type: "warning",
        duration: 3,
      });
    }

  };

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        title={
          <Typography className="text-xl font-medium text-red-600">
            Please check NOTE, change & submit registration {data?.id} again!
          </Typography>
        }
        centered
        onCancel={onCloseModal}
        footer={null}
        width={1000}
      >
        {/* onFinish={handleSubmit(onSubmit)} */}
        <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[0, 10]}>
            {/* Note */}
            <Col span={24} className='text-lg text-black'>
              <p className="font-bold text-xl uppercase">Note (Things need to change):</p>
              <p>- {data?.note}</p>
            </Col>

            {/* information */}
            <Col span={12} className='text-lg text-black'>
              {/* koi name */}
              <p><span className="font-semibold">Koi Name:</span> {data?.name}</p>
              {/* koi variety */}
              <p><span className="font-semibold">Koi Variety:</span> {data?.variety}</p>
            </Col>

            <Col span={12} className='text-lg text-black'>
              {/* show group */}
              <p><span className="font-semibold">Show Group:</span> {data?.group}</p>
            </Col>

            {/* koi size */}
            <Col span={12}>
              <label className="text-base text-black font-semibold">
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

            {/* description */}
            <Col span={24}>
              <label className="text-base text-black font-semibold">
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
                      rows={4}
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

            {/* video */}
            <Col span={24}>
              <label className="text-base text-black font-semibold">
                <p>
                  <span className="text-red-600">* </span>
                  Koi Video:
                  <span> (<a href={`${data?.video}`} target="_blank" rel="noopener noreferrer">Your video here</a>)</span>
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

            {/* images */}
            <Col span={24} className='flex flex-col justify-center items-start'>
              <label className="text-base text-black mb-6 font-semibold">
                <p>
                  <span className="text-red-600">* </span>
                  Koi Images:
                </p>
                <p className="text-red-600">
                  (Vertical photo preferred and larger photos are recommended,
                  jpg or png files accepted. Must be 3 images allowed. Each picture must be under 1MB.)
                </p>
              </label>

              {/* Image Uploads */}
              <div className='flex items-center justify-start space-x-4'>
                <ImageUpload name='image1' imageUrl={imageUrl1} setImageUrl={setImageUrl1} setFile={setImageFile1} />
                <ImageUpload name='image2' imageUrl={imageUrl2} setImageUrl={setImageUrl2} setFile={setImageFile2} />
                <ImageUpload name='image3' imageUrl={imageUrl3} setImageUrl={setImageUrl3} setFile={setImageFile3} />
              </div>

            </Col>

            <Col span={24} className="flex justify-end">
              <Button size="large" type="default" onClick={onCloseModal}>
                Cancel
              </Button>
              <Button
                loading={isPending}
                htmlType="submit"
                size="large"
                type="primary"
                className="ml-3"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default SubmitAgainModal