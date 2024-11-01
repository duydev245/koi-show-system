import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { validCountries } from './VarietyManangement';
import { Button, Col, Form, Input, message, Modal, Radio, Row, Select, Typography } from 'antd';

const EditVarietyModal = (
  {
    data,
    isOpen,
    onCloseModal,
    isPending,
    handleUpdateVarietyApi,
  }
) => {

  const schema = yup.object({
    VarietyName: yup.string().trim().required("*Variety name is required!"),
    VarietyOrigin: yup
      .string()
      .trim()
      .required("*Variety origin is required!")
      .oneOf(validCountries, "*Invalid country name"),
    VarietyDescription: yup.string().trim().required("*Variety description is required!"),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      VarietyName: data?.varietyName || "",
      VarietyOrigin: data?.varietyOrigin || "",
      VarietyDescription: data?.varietyDescription || "",
      VarietyStatus: data?.varietyStatus || true,
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const onSubmit = (values) => {
    const payload = new FormData();

    payload.append("VarietyId", data.varietyId);
    payload.append("VarietyName", values.VarietyName);
    payload.append("VarietyOrigin", values.VarietyOrigin);
    payload.append("VarietyDescription", values.VarietyDescription);
    payload.append("VarietyStatus", values.VarietyStatus);

    // for (let [key, value] of payload.entries()) {
    //     console.log(`${key}:`, value);
    // }

    handleUpdateVarietyApi(payload);
  };

  useEffect(() => {
    if (data && isOpen) {
      setValue("VarietyName", data?.varietyName);
      setValue("VarietyOrigin", data?.varietyOrigin);
      setValue("VarietyDescription", data?.varietyDescription);
      setValue("VarietyStatus", data?.varietyStatus);
    } else if (!isOpen) {
      reset();
    }
  }, [data, isOpen, setValue, reset]);


  return (
    <>
      <Modal
        open={isOpen}
        title={
          <Typography className="text-xl font-medium">
            Edit Variety
          </Typography>
        }
        centered
        onCancel={onCloseModal}
        footer={null}
        width={800}
      >
        <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
          <Row gutter={[48, 16]}>
            {/* VarietyName */}
            <Col span={24}>
              <label className="text-base text-black">
                <span className="text-red-600">* </span>
                Variety Name:
              </label>
              <Controller
                name="VarietyName"
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      type="text"
                      size="large"
                      className="mt-1"
                      placeholder="Please enter variety name..."
                      status={errors.VarietyName ? "error" : ""}
                    />
                  );
                }}
              />
              {errors?.VarietyName && (
                <span className="mt-1 text-base text-red-500">
                  {" "}
                  {errors.VarietyName.message}
                </span>
              )}
            </Col>

            {/* VarietyOrigin */}
            <Col span={24}>
              <label className="text-base text-black">
                <span className="text-red-600">* </span>
                Variety Origin:
              </label>
              <Controller
                name="VarietyOrigin"
                control={control}
                render={({ field }) => {
                  return (
                    <Select
                      {...field}
                      size="large"
                      className="mt-1 w-full"
                      defaultValue={data?.VarietyOrigin}
                      placeholder="Please select variety origin..."
                      allowClear
                      status={errors.VarietyOrigin ? "error" : ""}
                    >
                      <Select.Option value="Japan">Japan</Select.Option>
                      <Select.Option value="Germany">Germany</Select.Option>
                    </Select>
                  );
                }}
              />
              {errors?.VarietyOrigin && (
                <span className="mt-1 text-base text-red-500">
                  {" "}
                  {errors.VarietyOrigin.message}
                </span>
              )}
            </Col>

            {/* VarietyDescription */}
            <Col span={24}>
              <label className="text-base text-black">
                <span className="text-red-600">* </span>
                Variety Description:
              </label>
              <Controller
                name="VarietyDescription"
                control={control}
                render={({ field }) => {
                  return (
                    <Input.TextArea
                      {...field}
                      rows={5}
                      size="large"
                      className="mt-1"
                      placeholder="Please write something about this variety..."
                      status={errors.VarietyDescription ? "error" : ""}
                    />
                  );
                }}
              />
              {errors?.VarietyDescription && (
                <span className="mt-1 text-base text-red-500">
                  {" "}
                  {errors.VarietyDescription.message}
                </span>
              )}
            </Col>

            {/* VarietyStatus */}
            <Col span={24}>
              <label className="text-base text-black">
                Status:
              </label>
              <Controller
                name="VarietyStatus"
                control={control}
                render={({ field }) => {
                  return (
                    <Radio.Group {...field} className="ms-4" defaultValue={true}>
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>Inactive</Radio>
                    </Radio.Group>
                  );
                }}
              />
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
                Edit Variety
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default EditVarietyModal