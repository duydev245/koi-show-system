import { Button, Col, Form, Input, Modal, Radio, Row, Select, Typography } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { validCountries } from './VarietyManangement';

const AddVarietyModal = (
    {
        isOpen,
        onCloseModal,
        isPending,
        handleAddVarietyApi,
    }
) => {

    const schema = yup.object({
        VarietyName: yup.string().trim().required("*Variety name is required!"),
        VarietyOrigin: yup
            .string()
            .trim()
            .required("*Variety origin is required!")
            .oneOf(validCountries, "*Invalid country name"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            VarietyName: "",
            VarietyOrigin: "",
            VarietyStatus: true,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values) => {
        const payload = new FormData();

        payload.append("VarietyName", values.VarietyName);
        payload.append("VarietyOrigin", values.VarietyOrigin);
        payload.append("VarietyStatus", true);

        // for (let [key, value] of payload.entries()) {
        //     console.log(`${key}:`, value);
        // }

        handleAddVarietyApi(payload);
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen]);

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-xl font-medium">
                        Add Variety
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
                                Add Variety
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default AddVarietyModal