import React, { useEffect } from 'react'
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Typography } from 'antd';
import { Controller, useForm } from 'react-hook-form';

const InfoModal = (
    {
        data,
        isOpen,
        onCloseModal,
        isPending,
        handleUpdateUserApi,
    }
) => {
    const schema = yup.object({
        name: yup.string().trim().required("* Full name is required!"),
        phone: yup
            .string()
            .trim()
            .required("* Phone number is required!")
            .matches(/^[0-9]+$/, "* Phone number must contain only digits!")
            .min(9, "* Phone number must be at least 9 digits!")
            .max(11, "* Phone number must not exceed 11 digits!"),
        dateOfBirth: yup
            .string()
            .nullable()
            .required("* Date of birth is required!"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: data?.email || "",
            name: data?.name || "",
            phone: data?.phone || "",
            dateOfBirth: data?.dateOfBirth || null,
            gender: data?.gender,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    useEffect(() => {
        if (data && isOpen) {
            setValue("email", data?.email);
            setValue("name", data?.name);
            setValue("phone", data?.phone);
            setValue("dateOfBirth", data?.dateOfBirth);
            setValue("gender", data?.gender);
        } else if (!isOpen) {
            reset();
        }
    }, [data, isOpen, setValue, reset]);

    const onSubmit = (values) => {
        // const payload = {
        //     // id: data.id,
        //     // email: values.email,
        //     name: values.name,
        //     phone: values.phone,
        //     dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
        //     gender: values.gender,
        // };

        const payload = new FormData();
        payload.append('Name', values.name);
        payload.append('Phone', values.phone);
        payload.append('DateOfBirth', dayjs(values.dateOfBirth).format('YYYY-MM-DD'));
        payload.append('Gender', values.gender);

        handleUpdateUserApi(payload);
    };

    return (
        <Modal
            open={isOpen}
            title={
                <Typography className="text-xl font-medium">
                    Edit personal information
                </Typography>
            }
            centered
            onCancel={onCloseModal}
            footer={null}
            width={800}
        >
            <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[48, 16]}>
                    {/* Email */}
                    <Col span={24}>
                        <label className="text-base text-black">
                            <span className="text-red-600">* </span>
                            Email:
                        </label>
                        <Controller
                            name="email"
                            control={control}

                            render={({ field }) => {
                                return (
                                    <Input
                                        {...field}
                                        type="text"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Please enter your email..."
                                        disabled={!!data}
                                    />
                                );
                            }}
                        />
                    </Col>
                    {/* Name */}
                    <Col span={24}>
                        <label className="text-base text-black">
                            <span className="text-red-600">* </span>
                            Name:
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
                                        placeholder="Please enter your full name..."
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
                    {/* phone */}
                    <Col span={24}>
                        <label className="text-base text-black">
                            <span className="text-red-600">* </span>
                            Phone Number:
                        </label>
                        <Controller
                            name="phone"

                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input
                                        {...field}
                                        type="text"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Please enter your phone number..."
                                        status={errors.phone ? "error" : ""}
                                    />
                                );
                            }}
                        />
                        {errors?.phone && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {errors.phone.message}
                            </span>
                        )}
                    </Col>
                    {/* dateOfBirth */}
                    <Col span={12}>
                        <label className="block text-base text-black">
                            <span className="text-red-600">* </span>
                            Date of birth:
                        </label>
                        <Controller
                            name="dateOfBirth"
                            control={control}

                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    size="large"
                                    className="mt-1 w-full"
                                    placeholder="DD/MM/YYYY"
                                    status={errors.dateOfBirth ? "error" : ""}
                                    format={"DD/MM/YYYY"}
                                    value={field.value ? dayjs(field.value) : null}
                                    onChange={(date) =>
                                        field.onChange(date ? date : null)
                                    }
                                />
                            )}
                        />
                        {errors.dateOfBirth && (
                            <span className="mt-1 text-base text-red-500">
                                {" "}
                                {errors.dateOfBirth.message}
                            </span>
                        )}
                    </Col>
                    {/* Gender */}
                    <Col span={12}>
                        <label className="block text-base text-black">
                            <span className="text-red-600">* </span>
                            Gender:</label>
                        <Controller
                            name="gender"

                            control={control}
                            render={({ field }) => (
                                <Radio.Group {...field} className="mt-1" defaultValue={false}>
                                    <Radio value={true}>Male</Radio>
                                    <Radio value={false}>Female</Radio>
                                </Radio.Group>
                            )}
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
                            Update
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default InfoModal
