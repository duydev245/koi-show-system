import { Button, Col, DatePicker, Form, Input, Modal, Radio, Row, Select, Typography } from 'antd'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import dayjs from "dayjs";

const AddUserModal = (
    {
        isOpen,
        onCloseModal,
        dataListRole,
        isLoadingRole,
        isPending,
        handleAddUserApi,
    }
) => {

    const schema = yup.object({
        email: yup
            .string()
            .trim()
            .required("*Email is required!")
            .email("*Invalid email address!"),
        password: yup
            .string()
            .trim()
            .required("*Password is required!"),
        confirmPassword: yup
            .string()
            .trim()
            .required("*Password confirmation is required!")
            .oneOf([yup.ref("password")], "Password confirmation does not match"),
        name: yup.string().trim().required("*Full name is required!"),
        phone: yup
            .string()
            .trim()
            .required("*Phone number is required!")
            .matches(/^[0-9]+$/, "*Phone number must contain only digits!")
            .min(9, "*Phone number must be at least 9 digits!")
            .max(11, "*Phone number must not exceed 11 digits!"),
        dateOfBirth: yup
            .string()
            .nullable()
            .required("*Date of birth is required!"),
        role: yup.string().trim().required("*Role is required!"),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            phone: "",
            dateOfBirth: null,
            gender: true,
            role: "",
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values) => {

        const payload = new FormData();

        payload.append("Name", values.name)
        payload.append("Email", values.email)
        payload.append("Password", values.password)
        payload.append("Phone", values.phone)
        payload.append("DateOfBirth", dayjs(values.dateOfBirth).format('YYYY-MM-DD'))
        payload.append("Gender", values.gender)
        payload.append("RoleId", values.role)

        // for (let [key, value] of payload.entries()) {
        //     console.log(`${key}:`, value);
        // }

        handleAddUserApi(payload);
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
                        Add new user
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={800}
            >
                <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                    <Row gutter={[12, 10]}>
                        {/* Email */}
                        <Col span={24}>
                            <label className="text-base text-black font-semibold">
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
                                            placeholder="Please enter the email..."
                                            status={errors.email ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.email && (
                                <>
                                    {" "}
                                    <span className=" text-base text-red-500">
                                        {errors.email.message}
                                    </span>
                                </>
                            )}
                        </Col>
                        {/* password */}
                        <Col span={24}>
                            <label className="text-base text-black font-semibold">
                                <span className="text-red-600">* </span>
                                Password:
                            </label>
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input.Password
                                            {...field}
                                            type="password"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter the password..."
                                            iconRender={(visible) =>
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                            }
                                            status={errors.password ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.password && (
                                <span className=" text-base text-red-500">
                                    {" "}
                                    {errors.password.message}
                                </span>
                            )}
                        </Col>
                        {/* confirmPassword */}
                        <Col span={24}>
                            <label className="text-base text-black font-semibold">
                                <span className="text-red-600">* </span>
                                Confirm Password:
                            </label>
                            <Controller
                                name="confirmPassword"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input.Password
                                            {...field}
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter to confirm password..."
                                            iconRender={(visible) =>
                                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                            }
                                            status={errors.confirmPassword ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.confirmPassword && (
                                <>
                                    {" "}
                                    <span className=" text-base text-red-500">
                                        {errors.confirmPassword.message}
                                    </span>
                                </>
                            )}
                        </Col>
                        {/* name */}
                        <Col span={24}>
                            <label className="text-base text-black font-semibold">
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
                                            placeholder="Please enter the name..."
                                            status={errors.name ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.name && (
                                <span className=" text-base text-red-500">
                                    {" "}
                                    {errors.name.message}
                                </span>
                            )}
                        </Col>
                        {/* phone */}
                        <Col span={24}>
                            <label className="text-base text-black font-semibold">
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
                                            placeholder="Please enter the phone number..."
                                            status={errors.phone ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.phone && (
                                <span className=" text-base text-red-500">
                                    {" "}
                                    {errors.phone.message}
                                </span>
                            )}
                        </Col>
                        {/* dateOfBirth */}
                        <Col span={12}>
                            <label className="text-base text-black font-semibold">
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
                                <span className=" text-base text-red-500">
                                    {" "}
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </Col>
                        {/* Gender */}
                        <Col span={12}>
                            <label className="block text-base text-black font-semibold">
                                <span className="text-red-600">* </span>
                                Gender:
                            </label>
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
                        {/* role */}
                        <Col span={24}>
                            <label className="text-base text-black font-semibold">
                                <span className="text-red-600">* </span>
                                Role:
                            </label>
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Select
                                            {...field}
                                            size="large"
                                            className="mt-1 w-full"
                                            placeholder="Please select role..."
                                            allowClear
                                            defaultValue={undefined}
                                            status={errors.role ? "error" : ""}
                                            loading={isLoadingRole}
                                            options={
                                                dataListRole?.map(role => ({
                                                    label: role.title,
                                                    value: role.id,
                                                })) || []
                                            }
                                        />
                                    );
                                }}
                            />
                            {errors?.role && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.role.message}
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
                                Add User
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default AddUserModal