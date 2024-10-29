import { Button, Col, Form, Image, Input, Modal, Popconfirm, Row, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { groupApi } from '../../../apis/group.api';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showApi } from '../../../apis/show.api';

const EvaluateModal = (
    {
        data,
        isOpen,
        onCloseModal,
        isPending,
        handleEvaluateApi,
    }
) => {
    const [imgUrls, setImgUrls] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);

    const schema = yup.object().shape({
        GroupId: yup.number().required("*Required!").nullable(),
        Note: yup.string().trim().required("*Note is required!"),
    });

    // dataShow
    const { data: dataShow } = useQuery({
        queryKey: ["data-show", data?.showId],
        queryFn: () => showApi.getShowDetails(data?.showId),
        enabled: !!data?.showId,
    });

    // dataListGroup
    const { data: dataListGroup, isLoading } = useQuery({
        queryKey: ["list-group", data?.showId],
        queryFn: () => groupApi.getListGroupByShowId(data?.showId),
        enabled: !!data?.showId,
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            GroupId: data?.groupId || "",
            Note: "",
            Status: "",
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values, status) => {
        const payload = new FormData();

        payload.append("Id", data?.id);
        payload.append("GroupId", values.GroupId);
        payload.append("Note", values.Note);


        payload.append("Status", status)

        // for (let [key, value] of payload.entries()) {
        //     console.log(`${key}:`, value);
        // }

        handleEvaluateApi(payload);
    };

    useEffect(() => {
        if (data && isOpen) {
            const newUrls = [data.image1, data.image2, data.image3].filter(Boolean);
            setImgUrls(newUrls);
            setValue("GroupId", data?.groupId)
            setValue("Note", data?.note)
        } else if (!isOpen) {
            reset();
        }

    }, [data, isOpen, setValue, reset]);

    const watchGroupId = watch("GroupId");

    useEffect(() => {
        if (dataListGroup && watchGroupId) {
            const group = dataListGroup.find(group => group.groupId === watchGroupId);
            setSelectedGroup(group);
        }
    }, [dataListGroup, watchGroupId]);

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-2xl font-bold">
                        Evaluate Registration {data?.id}
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={1000}
            >
                <Form className="my-4" onFinish={handleSubmit(onSubmit)} >
                    <Row gutter={[0, 10]}>
                        {/* reg infor */}
                        <Col span={12} className='text-lg text-black'>
                            {/* koi name */}
                            <p><span className="font-semibold">Koi Name:</span> {data?.name}</p>
                            {/* koi size */}
                            <p><span className="font-semibold">Koi Size:</span> {data?.size} cm</p>
                            {/* koi variety */}
                            <p><span className="font-semibold">Koi Variety:</span> {data?.variety}</p>
                            {/* koi description */}
                            <p className="font-semibold">Koi Description:</p>
                            <p>{data?.description}</p>

                            {/* show group */}
                            <div className='flex flex-col items-start justify-start'>
                                <label className="text-lg text-black font-semibold">
                                    <span className="text-red-600">* </span>
                                    Show Group:
                                    {errors?.GroupId && (
                                        <span className="mt-1 text-base text-red-500">
                                            {" "}
                                            {errors.GroupId.message}
                                        </span>
                                    )}
                                </label>
                                <Controller
                                    name="GroupId"
                                    control={control}
                                    render={({ field }) => {
                                        return (
                                            <Select
                                                {...field}
                                                size="large"
                                                className="mt-1 w-4/5"
                                                placeholder="Please select the group..."
                                                status={errors.GroupId ? "error" : ""}
                                                loading={isLoading}
                                                options={
                                                    dataListGroup?.map(group => ({
                                                        label: group.groupName,
                                                        value: group.groupId,
                                                    })) || []
                                                }
                                                onChange={(value) => {
                                                    field.onChange(value);
                                                    // const selected = dataListGroup.find(group => group.groupId === value);
                                                    // setSelectedGroup(selected);
                                                }}
                                            />

                                        );
                                    }}
                                />
                            </div>

                        </Col>

                        {/* show infor */}
                        <Col span={12} className='text-lg text-black'>
                            {/* show name */}
                            <p><span className="font-semibold">Show:</span> {dataShow?.showTitle}</p>
                            {/* Show standard */}
                            <div>
                                <span className="font-semibold">Show standard:</span>
                                <ul style={{ listStyleType: 'disc' }} className="ps-7">
                                    <li>
                                        <p><span className="font-semibold">Size min:</span> {selectedGroup?.sizeMin} cm</p>
                                    </li>
                                    <li>
                                        <p><span className="font-semibold">Size max:</span> {selectedGroup?.sizeMax} cm</p>
                                    </li>
                                    <li>
                                        <p className="font-semibold">Koi Varieties:</p>
                                        <ul style={{ listStyleType: 'circle' }} className="ps-3">
                                            {selectedGroup && selectedGroup?.varieties?.map((item) => (
                                                <li key={item.varietyId}>
                                                    <p>{item.varietyName}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        {/* koi images */}
                        <Col span={24} className='grid grid-cols-2'>
                            <label className="text-lg text-black font-semibold">
                                Koi Images:
                            </label>

                            <Carousel infiniteLoop useKeyboardArrows autoPlay>
                                {imgUrls && (
                                    imgUrls.map((url, index) => (
                                        <div key={index} className='relative'>
                                            <div className='z-10 inset-0 absolute top-0'>
                                                <Image
                                                    className='object-fit w-full'
                                                    preview={true}
                                                    src={url}
                                                />
                                            </div>
                                            <img
                                                src={url}
                                                className='object-fit w-full'
                                            />
                                        </div>
                                    ))
                                )}
                            </Carousel>
                        </Col>

                        {/* koi video */}
                        <Col span={24} className='grid grid-cols-1 space-y-3'>
                            <label className="text-lg text-black font-semibold">
                                Koi Video:
                            </label>

                            <iframe
                                className='w-full h-[500px]'
                                src={data.video}
                                allowFullScreen
                            >
                            </iframe>
                        </Col>

                        {/* Note */}
                        <Col span={24}>
                            <label className="text-lg text-black font-semibold">
                                <span className="text-red-600">* </span>
                                Note:
                            </label>
                            <Controller
                                name="Note"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input.TextArea
                                            {...field}
                                            rows={5}
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please write a note ..."
                                            status={errors.Note ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.Note && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.Note.message}
                                </span>
                            )}
                        </Col>

                        <Col span={24} className="flex justify-end">
                            <Button size="large" type="default" onClick={onCloseModal}>
                                Cancel
                            </Button>

                            <Popconfirm
                                title="Notification"
                                description="Are you sure you want to reject this registration?"
                                onConfirm={handleSubmit((values) => {
                                    onSubmit(values, 'Rejected');
                                })}
                                onCancel={() => { }}
                                placement="top"
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button
                                    loading={isPending}
                                    danger
                                    size="large"
                                    type="primary"
                                    className="ml-3"
                                >
                                    Reject
                                </Button>
                            </Popconfirm>


                            <Button
                                loading={isPending}
                                onClick={handleSubmit((values) => {
                                    onSubmit(values, 'Accepted');
                                })}
                                size="large"
                                type="primary"
                                className="ml-3"
                            >
                                Approve
                            </Button>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default EvaluateModal