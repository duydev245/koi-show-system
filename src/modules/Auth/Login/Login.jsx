import { Col, Form, Input, message, Row, Typography } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import React from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';
import { useDispatch } from 'react-redux';

const Login = () => {
    const { Title } = Typography;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

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
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    // const { mutate: handleLogin } = useMutation({
    //     mutationFn: (payload) => userApi.login(payload),
    //     onSuccess: (data) => {
    //       setLocalStorage("user", data?.user);
    //       setLocalStorage("token", data?.token);
    //       dispatch(setUser(data?.user));
    //     },
    //     onError: (error) => {
    //       messageApi.open({
    //         content: error.message,
    //         type: "error",
    //         duration: 3,
    //       });
    //     },
    //   });

    const onSubmit = (values) => {
        const payload = {
            email: values.email,
            password: values.password,
        };
        console.log("🚀 ~ onSubmit ~ payload:", payload)
        // handleLogin(payload);
    };

    return (
        <div className='container mx-auto'>
            {contextHolder}
            <div className="mt-3 mb-3 text-center">
                <Typography className="text-black">
                    <Title level={2}>Welcome back to KoiKoi</Title>
                </Typography>
            </div>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <Row gutter={[48, 16]}>
                    <Col span={24}>
                        <label className="text-base text-black font-semibold">*Email:</label>
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
                                        status={errors.email ? "error" : ""}
                                    />
                                );
                            }}
                        />
                        {errors?.email && (
                            <>
                                {" "}
                                <span className="text-base text-red-500">
                                    {errors.email.message}
                                </span>
                            </>
                        )}
                    </Col>

                    <Col span={24}>
                        <label className="text-base text-black font-semibold">*Password:</label>
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
                                        placeholder="Please enter your password..."
                                        iconRender={(visible) =>
                                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                                        }
                                        status={errors.password ? "error" : ""}
                                    />
                                );
                            }}
                        />
                        {errors?.password && (
                            <span className="text-base text-red-500">
                                {" "}
                                {errors.password.message}
                            </span>
                        )}
                    </Col>

                    <Col span={24}>
                        <Typography className="text-sm text-black">
                            You don't have account?{" "}
                            <span
                                className="text-green-700 font-medium cursor-pointer"
                                onClick={() => navigate(PATH.REGISTER)}
                            >
                                Register now
                            </span>
                        </Typography>
                    </Col>

                    <Col span={24}>
                        <button
                            className="btn-theme"
                            type="submit"
                        >
                            Log In
                        </button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Login
