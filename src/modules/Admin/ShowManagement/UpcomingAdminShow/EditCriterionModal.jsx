import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditCriterionModal = (
    {
        data,
        isOpen,
        onCloseModal,
        handleUpdateCriterion,
    }
) => {

    const schema = yup.object({
        name: yup.string().trim().required("*Name is required!"),
        percentage: yup
            .number()
            .typeError('*Percentage must be number!')
            .min(1, '*Percentage must be over 0!')
            .max(100, '*Percentage must be under 100!')
            .required("*Percentage is required!")
            .nullable(),
        description: yup
            .string()
            .trim()
            .required("*Description is required!")
            .test("minWords", "*Description must be at least 5 words", (value) => {
                if (!value) return false;
                const wordCount = value.split(/\s+/).filter(Boolean).length;
                return wordCount >= 5;
            }),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: data?.name || "",
            percentage: data?.percentage || "",
            description: data?.description || "",
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values) => {
        const payload = {
            id: data?.id,
            ...values,
        }

        handleUpdateCriterion(payload);
    }

    useEffect(() => {
        if (isOpen) {

            setValue("name", data?.name)
            setValue("percentage", data?.percentage)
            setValue("description", data?.description)

        } else {
            reset();
        }
    }, [isOpen]);

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-xl font-medium">
                        Edit criterion
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={600}
            >
                <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                    <Row gutter={[10, 10]} className='mt-1'>
                        {/* name */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Criterion Name:
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="text"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter criterion name..."
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
                        {/* percentage */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Criterion Percentage (%):
                            </label>
                            <Controller
                                name="percentage"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="number"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter criterion percentage..."
                                            status={errors.percentage ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.percentage && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.percentage.message}
                                </span>
                            )}
                        </Col>
                        {/* description */}
                        <Col span={24}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Criterion Description:
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input.TextArea
                                            {...field}
                                            type="text"
                                            rows={3}
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter criterion description..."
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

                        <Col span={24} className='flex justify-end space-x-2'>
                            <Button size="middle" type="default" onClick={onCloseModal}>
                                Cancel
                            </Button>

                            <Button htmlType='submit' size='middle' type="primary">
                                Edit Criteria
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default EditCriterionModal