import { Button, Col, Form, Input, Modal, Row, Typography } from 'antd';
import React, { useEffect } from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from 'react-hook-form';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const PwStaffModal = (
    {
        isOpen,
        onCloseModal,
        isPending,
        handleUpdatePass
    }
) => {

    const schema = yup.object({
        currentPassword: yup
            .string()
            .trim()
            .required("* Current Password is required!"),
        newPassword: yup
            .string()
            .trim()
            .required("* New Password is required!"),
        confirmNewPassword: yup
            .string()
            .trim()
            .required("* Password confirmation is required!")
            .oneOf([yup.ref("newPassword")], "* Password confirmation does not match"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values) => {
        // const payload = {
        //     curentPassword: values.currentPassword,
        //     newPassword: values.newPassword,
        // };
        const payload = new FormData();
        payload.append('CurentPassword', values.currentPassword);
        payload.append('NewPassword', values.newPassword);

        handleUpdatePass(payload);
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen])

    return (
        <Modal
            open={isOpen}
            title={
                <Typography className="text-xl font-medium">
                    Change personal password
                </Typography>
            }
            centered
            onCancel={onCloseModal}
            footer={null}
            width={800}
        >
            <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[48, 16]}>
                    {/* currentPassword */}
                    <Col span={24}>
                        <label className="text-base text-black font-semibold">*Current Password:</label>
                        <Controller
                            name="currentPassword"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input.Password
                                        {...field}
                                        type="password"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Please enter your current password..."
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                        status={errors.currentPassword ? "error" : ""}
                                    />
                                );
                            }}
                        />
                        {errors?.currentPassword && (
                            <span className=" text-base text-red-500">
                                {" "}
                                {errors.currentPassword.message}
                            </span>
                        )}
                    </Col>
                    {/* newPassword */}
                    <Col span={24}>
                        <label className="text-base text-black font-semibold">*New Password:</label>
                        <Controller
                            name="newPassword"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input.Password
                                        {...field}
                                        type="password"
                                        size="large"
                                        className="mt-1"
                                        placeholder="Please enter your new password..."
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                        status={errors.newPassword ? "error" : ""}
                                    />
                                );
                            }}
                        />
                        {errors?.newPassword && (
                            <span className=" text-base text-red-500">
                                {" "}
                                {errors.newPassword.message}
                            </span>
                        )}
                    </Col>
                    {/* confirmNewPassword */}
                    <Col span={24}>
                        <label className="text-base text-black font-semibold">*Confirm Password:</label>
                        <Controller
                            name="confirmNewPassword"
                            control={control}
                            render={({ field }) => {
                                return (
                                    <Input.Password
                                        {...field}
                                        size="large"
                                        className="mt-1"
                                        placeholder="Please enter to confirm new password..."
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                        status={errors.confirmNewPassword ? "error" : ""}
                                    />
                                );
                            }}
                        />
                        {errors?.confirmNewPassword && (
                            <>
                                {" "}
                                <span className=" text-base text-red-500">
                                    {errors.confirmNewPassword.message}
                                </span>
                            </>
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
                            Update
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default PwStaffModal