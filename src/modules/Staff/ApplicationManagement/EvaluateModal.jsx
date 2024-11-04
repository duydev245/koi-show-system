import { Button, Col, Form, Image, Input, Modal, Row, Select, Typography } from 'antd'
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
    const [allShowGroup, setAllShowGroup] = useState(null);

    const schema = yup.object().shape({
        isChecked: yup.boolean(),

        GroupId: yup
            .string()
            .trim()
            .nullable()
            .when('isChecked', {
                is: true, // When isChecked is true (Accepted)
                then: (schema) => schema.required("*Group is required!"),
                otherwise: (schema) => schema.notRequired(),
            }),

        Note: yup
            .string()
            .trim()
            .when('isChecked', {
                is: false, // When isChecked is false (Rejected)
                then: (schema) => schema.required("*Note is required!"),
                otherwise: (schema) => schema.notRequired(),
            }),
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
        clearErrors,
        trigger,
    } = useForm({
        defaultValues: {
            isChecked: false,
            GroupId: data?.groupId || "",
            Note: "",
        },
        resolver: yupResolver(schema),
        // criteriaMode: "all",
    });

    const onSubmit = (values, status) => {
        const payload = new FormData();

        payload.append("Id", data?.id);
        payload.append("Note", values.Note);
        payload.append("Status", status)

        if (status === 'Accepted') {
            payload.append("GroupId", values.GroupId);
        }

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
            setValue('isChecked', undefined);
        }

    }, [data, isOpen, setValue, reset]);

    useEffect(() => {
        if (dataListGroup) {
            setAllShowGroup(dataListGroup);
        }
    }, [dataListGroup]);

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
                    <Row gutter={[24, 10]}>
                        {/* reg infor */}
                        <Col span={12} className='text-lg text-black space-y-2'>
                            {/* koi name */}
                            <p><span className="font-semibold">Koi Name:</span> {data?.name}</p>
                            {/* koi size */}
                            <p><span className="font-semibold">Koi Size:</span> {data?.size} cm</p>
                            {/* koi variety */}
                            <p><span className="font-semibold">Koi Variety:</span> {data?.variety}</p>
                            {/* koi description */}
                            <div>
                                <p className="font-semibold">Koi Description:</p>
                                <p>{data?.description}</p>
                            </div>
                            {/* Koi Images */}
                            <div className='space-y-1'>
                                <p className="text-lg text-black font-semibold">
                                    Koi Images:
                                </p>
                                <Carousel infiniteLoop useKeyboardArrows>
                                    {imgUrls && (
                                        imgUrls.map((url, index) => (
                                            <img
                                                key={index}
                                                src={url}
                                                className='object-fit w-full'
                                            />
                                        ))
                                    )}
                                </Carousel>
                            </div>
                        </Col>

                        {/* show infor */}
                        <Col span={12} className='text-lg text-black space-y-2'>
                            {/* show name */}
                            <p><span className="font-semibold">Show:</span> {dataShow?.showTitle}</p>
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
                                                defaultValue={data?.groupId}
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
                            {/* Show standard */}
                            <div>
                                <span className="font-semibold">All show groups standard:</span>
                                <div className="space-y-3">
                                    {allShowGroup?.map((gr) => (
                                        <div key={gr.groupId} className='bg-gray-100 p-4 rounded-md space-y-1'>
                                            <p className='font-semibold'>{gr.groupId}. {gr?.groupName}:</p>
                                            <p><span className="font-semibold">- Size range:</span> {gr?.sizeMin} cm - {gr?.sizeMax} cm</p>
                                            <p className="font-semibold">- Koi Varieties:</p>
                                            <div className='pl-2'>
                                                {gr?.varieties?.map((item) => (
                                                    <p key={item.varietyId}>+ {item.varietyName}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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


                            <Button
                                loading={isPending}
                                onClick={handleSubmit(async (values) => {
                                    setValue('isChecked', false);
                                    const isValid = await trigger('Note');
                                    if (isValid) {
                                        onSubmit(values, 'Rejected');
                                    }

                                })}
                                danger
                                size="large"
                                type="primary"
                                className="ml-3"
                            >
                                Reject
                            </Button>


                            <Button
                                loading={isPending}
                                onClick={handleSubmit(async (values) => {
                                    setValue('isChecked', true);
                                    const isValid = await trigger('GroupId');
                                    if (isValid) {
                                        onSubmit(values, 'Accepted');
                                    }
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