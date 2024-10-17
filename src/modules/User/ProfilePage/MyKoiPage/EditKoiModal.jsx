import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Image, Input, message, Modal, Row, Select, Typography, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const EditKoiModal = ({
    data,
    isOpen,
    onCloseModal,
    isLoading,
    isPending,
    handleUpdateKoiApi,
    dataListVariety,
    isLoadingVariety,
}) => {
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(undefined);
    const [messageApi, contextHolder] = message.useMessage();

    const schema = yup.object({
        name: yup.string().trim().required("*Name is required!"),
        size: yup.number('*Size must be number!').min(15, '*Size must be over 15cm!').required("*Size is required!").nullable(),
        variety: yup.number().required("*Koi variety is required!").nullable(),
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
            name: "",
            size: undefined,
            variety: undefined,
            description: "",
            image: undefined,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    useEffect(() => {
        if (data && isOpen) {
            setValue("name", data?.koiName);
            setValue("size", data?.koiSize);
            setValue("variety", data?.varietyId);
            setValue("description", data?.koiDesc);
            setImageUrl(data?.koiImg);
        } else if (!isOpen) {
            reset();
            setImageUrl(undefined);
        }
    }, [data, isOpen, setValue, reset]);

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
        // Show preview of the selected image
        if (fileList.length > 0) {
            const reader = new FileReader();
            reader.onload = e => setImageUrl(e.target.result);
            reader.readAsDataURL(fileList[0].originFileObj);
            // Set the file value for react-hook-form
            setValue('image', fileList[0].originFileObj);
        } else {
            setImageUrl(undefined);
            setValue('image', undefined);
        }
    };

    const handleDelete = () => {
        setFileList([]);
        setImageUrl(undefined);
        setValue('image', undefined);
    };

    const onSubmit = (values) => {
        // console.log("🚀 ~ onSubmit ~ values:", values)
        const payload = new FormData();
        let hasChanges = false;

        if (values.name !== data.koiName) {
            payload.append("Name", values.name);
            hasChanges = true;
        }

        if (values.description !== data.koiDesc) {
            payload.append("Description", values.description);
            hasChanges = true;
        }

        if (values.image !== undefined) {
            payload.append("Image", values.image);
            hasChanges = true;
        }

        if (values.size !== data.koiSize) {
            payload.append("Size", values.size);
            hasChanges = true;
        }

        if (values.variety !== data.varietyId) {
            payload.append("VarietyId", values.variety);
            hasChanges = true;
        }

        if (hasChanges) {
            payload.append("Id", data.koiID);
            handleUpdateKoiApi(payload);
            // for (let [key, value] of payload.entries()) {
            //     console.log(`${key}:`, value);
            // }
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
                loading={isLoading}
                title={
                    <Typography className="text-xl font-medium">
                        Edit your Koi information
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={800}
            >
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
                                            defaultValue={data?.varietyId}
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

                        {/* image */}
                        <Col span={12} className='flex flex-col justify-center items-start'>
                            <label className="text-base text-black mb-2">
                                <span className="text-red-600">* </span>
                                Koi Image:
                            </label>

                            <Upload
                                name="image"
                                listType="picture-card"
                                className={`avatar-uploader ${errors.image ? 'border border-red-500 rounded-lg' : ''}`}
                                fileList={fileList}
                                onChange={handleChange}
                                beforeUpload={() => false} // Prevent auto upload
                                showUploadList={false}
                            >
                                <button
                                    style={{ border: 0, background: "none" }}
                                    type="button"
                                >
                                    {
                                        imageUrl ? (
                                            <>
                                                <div className='relative inline-block' onClick={(event) => { event.stopPropagation(); }}>
                                                    <Image
                                                        width={105}
                                                        height={110}
                                                        src={imageUrl}
                                                    />
                                                    {imageUrl !== undefined && (
                                                        <DeleteOutlined
                                                            onClick={handleDelete}
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
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Upload</div>
                                            </>
                                        )
                                    }
                                </button>
                            </Upload>

                            {errors.image && (
                                <span className="mt-1 text-base text-red-500">
                                    {errors.image.message}
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
                                Edit Koi
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default EditKoiModal