import { Col, DatePicker, Form, Input, message, Radio, Row, Typography } from 'antd';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { PATH } from '../../../routes/path';
import { useMutation } from '@tanstack/react-query';
import { userApi } from '../../../apis/user.api';

const Register = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    birthday: yup
      .string()
      .nullable()
      .required("*Date of birth is required!"),
  });


  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      birthday: null,
      gender: true,
    },
    resolver: yupResolver(schema),
    criteriaMode: "all",
  });

  const { mutate: handleRegister } = useMutation({
    mutationKey: ['register'],
    mutationFn: (payload) => userApi.register(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data.message,
        type: "success",
        duration: 3,
      });
      navigate(PATH.LOGIN);
    },
    onError: (error) => {
      messageApi.open({
        content: error.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const onSubmit = (values) => {
    const payload = {
      email: values.email,
      password: values.password,
      name: values.name,
      phone: values.phone,
      dateOfBirth: dayjs(values.birthday).format('YYYY-MM-DD'),
      gender: values.gender,
      // role: "USER",
    };
    handleRegister(payload);
  };

  return (
    <div className='container mx-auto'>
      {contextHolder}
      <div className="mt-3 mb-3 text-center">
        <Typography className="text-black">
          <Title level={2}>Register KoiKoi</Title>
        </Typography>
      </div>

      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Row gutter={[12, 10]}>
          {/* Email */}
          <Col span={24}>
            <label className="text-base text-black font-semibold">*Email:</label>
            {errors?.email && (
              <>
                {" "}
                <span className=" text-base text-red-500">
                  {errors.email.message}
                </span>
              </>
            )}
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
          </Col>
          {/* password */}
          <Col span={24}>
            <label className="text-base text-black font-semibold">*Password:</label>
            {errors?.password && (
              <span className=" text-base text-red-500">
                {" "}
                {errors.password.message}
              </span>
            )}
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
          </Col>
          {/* confirmPassword */}
          <Col span={24}>
            <label className="text-base text-black font-semibold">*Confirm Password:</label>
            {errors?.confirmPassword && (
              <>
                {" "}
                <span className=" text-base text-red-500">
                  {errors.confirmPassword.message}
                </span>
              </>
            )}
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
          </Col>
          {/* name */}
          <Col span={24}>
            <label className="text-base text-black font-semibold">*Full Name:</label>
            {errors?.name && (
              <span className=" text-base text-red-500">
                {" "}
                {errors.name.message}
              </span>
            )}
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
          </Col>
          {/* phone */}
          <Col span={24}>
            <label className="text-base text-black font-semibold">*Phone Number:</label>
            {errors?.phone && (
              <span className=" text-base text-red-500">
                {" "}
                {errors.phone.message}
              </span>
            )}
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
          </Col>
          {/* birthday */}
          <Col span={12}>
            <label className="text-base text-black font-semibold">*Date of birth:</label>
            {errors.birthday && (
              <span className=" text-base text-red-500">
                {" "}
                {errors.birthday.message}
              </span>
            )}
            <Controller
              name="birthday"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  size="large"
                  className="mt-1 w-full"
                  placeholder="DD/MM/YYYY"
                  status={errors.birthday ? "error" : ""}
                  format={"DD/MM/YYYY"}
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date : null)
                  }
                />
              )}
            />
          </Col>
          {/* Gender */}
          <Col span={12}>
            <label className="block text-base text-black font-semibold">*Gender:</label>
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

          <Col span={24}>
            <Typography className="text-sm text-black">
              You already have account?{" "}
              <span
                className="text-blue-700 font-medium cursor-pointer"
                onClick={() => navigate(PATH.LOGIN)}
              >
                Log in
              </span>
            </Typography>
          </Col>

          <Col span={24}>
            <button
              className="btn-theme"
              type="submit"
            >
              Register
            </button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Register
