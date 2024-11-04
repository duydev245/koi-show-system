import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Image, Input, message, Modal, Row, Typography, Upload } from 'antd';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isBetween from 'dayjs/plugin/isBetween';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// datePick
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

const disabledDate = (current) => {
    return current && current < dayjs().endOf('day');
};

const EditShowModal = (
    {
        data,
        isOpen,
        onCloseModal,
        isPending,
        handleEditShowApi,
    }
) => {

    const [messageApi, contextHolder] = message.useMessage();

    const [registrationTime, setRegistrationTime] = useState([]);
    const [regFault, setRegFault] = useState(false);

    const [scoreTime, setScoreTime] = useState([]);
    const [scoreFault, setScoreFault] = useState(false);

    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState(undefined);

    const schema = yup.object({
        title: yup.string().trim().required("*Title is required!"),
        entranceFee: yup
            .number()
            .typeError('*Entrance Fee must be number!')
            .min(10000, '*Entrance Fee must be 10.000 VND at least!')
            .required("*Entrance Fee is required!")
            .nullable(),
        description: yup
            .string()
            .trim()
            .required("*Description is required!")
            .test("minWords", "*Description must be at least 10 words", (value) => {
                if (!value) return false;
                const wordCount = value.split(/\s+/).filter(Boolean).length;
                return wordCount >= 10;
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
            title: data?.showTitle || "",
            entranceFee: data?.entranceFee || "",
            description: data?.showDesc || "",

            registerStartDate: null,
            registerEndDate: null,
            scoreStartDate: null,
            scoreEndDate: null,

            banner: undefined,
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const handleChange = ({ fileList }) => {
        setFileList(fileList);
        // Show preview of the selected image
        if (fileList.length > 0) {
            const reader = new FileReader();
            reader.onload = e => setImageUrl(e.target.result);
            reader.readAsDataURL(fileList[0].originFileObj);
            // Set the file value for react-hook-form
            setValue('banner', fileList[0].originFileObj);
        } else {
            setImageUrl(undefined);
            setValue('banner', undefined);
        }
    };

    const handleDelete = () => {
        setFileList([]);
        setImageUrl(undefined);
        setValue('banner', undefined);
    };

    const validateTimeRange = (timeRange, message, setFault) => {
        if (!timeRange || timeRange.length !== 2) {
            messageApi.open({
                content: message,
                type: "warning",
                duration: 3,
            });
            setFault(true); // Set fault status to true if validation fails
            return false;
        }
        setFault(false);
        return true;
    };

    const validateNoOverlap = (registrationTime, scoreTime) => {
        if (registrationTime && scoreTime) {
            const [regStart, regEnd] = registrationTime;
            const [scoreStart, scoreEnd] = scoreTime;

            // Check if registration and score time ranges overlap
            if (
                regStart.isSame(scoreStart) ||
                regEnd.isSame(scoreEnd)
            ) {
                messageApi.open({
                    content: "Registration time and score time cannot be the same!",
                    type: "warning",
                    duration: 3,
                });
                setRegFault(true);
                setScoreFault(true);
                return false;
            }

            // Ensure score time starts after registration time ends
            if (scoreStart.isBefore(regEnd) ||
                regEnd.isSame(scoreStart) ||
                (scoreStart.isBetween(regStart, regEnd, null, '[]'))
            ) {
                messageApi.open({
                    content: "Score time must start after registration time ends!",
                    type: "warning",
                    duration: 3,
                });
                setRegFault(true);
                setScoreFault(true);
                return false;
            }
        }
        return true;
    };

    const onSubmit = (values) => {

        const isRegistrationTimeValid = validateTimeRange(
            registrationTime,
            "Please enter the registration time!",
            setRegFault
        );
        const isScoreTimeValid = validateTimeRange(
            scoreTime,
            "Please enter the score time!",
            setScoreFault
        );

        const noOverlap = validateNoOverlap(registrationTime, scoreTime);

        if (!isRegistrationTimeValid || !isScoreTimeValid || !noOverlap) return;

        const payload = new FormData();
        let hasChanges = false;

        // Append only changed values
        if (values.title !== data?.showTitle) {
            payload.append("Title", values.title);
            hasChanges = true;
        }
        if (values.entranceFee !== data?.entranceFee) {
            payload.append("EntranceFee", values.entranceFee);
            hasChanges = true;
        }
        if (values.description !== data?.showDesc) {
            payload.append("Description", values.description);
            hasChanges = true;
        }
        if (values.banner && values.banner !== undefined) {
            payload.append("Banner", values.banner);
            hasChanges = true;
        }

        if (
            registrationTime[0]?.format("YYYY-MM-DD") !== dayjs(data?.registrationStartDate).format("YYYY-MM-DD") ||
            registrationTime[1]?.format("YYYY-MM-DD") !== dayjs(data?.registrationCloseDate).format("YYYY-MM-DD")
        ) {
            payload.append("RegisterStartDate", dayjs(registrationTime[0]).format('YYYY-MM-DD'));
            payload.append("RegisterEndDate", dayjs(registrationTime[1]).format('YYYY-MM-DD'));
            hasChanges = true;
        }

        if (
            scoreTime[0]?.format("YYYY-MM-DD") !== dayjs(data?.startDate).format("YYYY-MM-DD") ||
            scoreTime[1]?.format("YYYY-MM-DD") !== dayjs(data?.endDate).format("YYYY-MM-DD")
        ) {
            payload.append("ScoreStartDate", dayjs(scoreTime[0]).format('YYYY-MM-DD'));
            payload.append("ScoreEndDate", dayjs(scoreTime[1]).format('YYYY-MM-DD'));
            hasChanges = true;
        }

        if (hasChanges) {
            payload.append("Id", data?.showId);
            // for (let [key, value] of payload.entries()) {
            //     console.log(`${key}:`, value);
            // }
            handleEditShowApi(payload)
        } else {
            messageApi.open({
                content: "No changes detected, update not required.",
                type: "warning",
                duration: 3,
            });
        }
    };

    useEffect(() => {
        if (data && isOpen) {
            setValue("title", data?.showTitle);
            setValue("description", data?.showDesc);
            setValue("entranceFee", data?.entranceFee);

            const registrationTemp = [];
            registrationTemp.push(
                dayjs(data?.registrationStartDate, "YYYY-MM-DD"),
                dayjs(data?.registrationCloseDate, "YYYY-MM-DD")
            );
            setRegistrationTime(registrationTemp);

            const scoringTemp = [];
            scoringTemp.push(
                dayjs(data?.startDate, "YYYY-MM-DD"),
                dayjs(data?.endDate, "YYYY-MM-DD")
            );
            setScoreTime(scoringTemp);


            setImageUrl(data?.showBanner);
        } else if (!isOpen) {
            reset();
            handleDelete();
            setScoreTime([]);
            setRegistrationTime([])
        }
    }, [data, isOpen, setValue, reset]);

    return (
        <>
            {contextHolder}
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-xl font-medium">
                        Edit show modal
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={800}
            >
                <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                    <Row gutter={[32, 12]}>
                        {/* title */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Show Title:
                            </label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="text"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter show title..."
                                            status={errors.title ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.title && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.title.message}
                                </span>
                            )}
                        </Col>

                        {/* entranceFee */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Entrance Fee (VND):
                            </label>
                            <Controller
                                name="entranceFee"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="number"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter show entrance fee..."
                                            status={errors.entranceFee ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.entranceFee && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.entranceFee.message}
                                </span>
                            )}
                        </Col>

                        {/* show description */}
                        <Col span={24}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Show Description:
                            </label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input.TextArea
                                            {...field}
                                            rows={4}
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please write something about the show..."
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

                        {/* Registration Time */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Registration Time:
                            </label>
                            <RangePicker
                                className='w-full h-[50px] font-semibold mt-1'
                                placeholder={[`Start Date`, `End Date`]}
                                status={regFault ? 'error' : ''}
                                disabledDate={disabledDate}
                                format="DD/MM/YYYY"
                                onChange={(dates) => {
                                    if (dates && dates[0].isSame(dates[1])) {
                                        messageApi.open({
                                            content: "Start date and end date cannot be the same!",
                                            type: "warning",
                                            duration: 3,
                                        });
                                        setRegistrationTime(null);
                                    } else {
                                        setRegistrationTime(dates);
                                    }
                                }}
                                value={registrationTime}
                            />
                        </Col>

                        {/* Score Time */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Score Time:
                            </label>
                            <RangePicker
                                className='w-full h-[50px] font-semibold mt-1'
                                placeholder={[`Start Date`, `End Date`]}
                                status={scoreFault ? 'error' : ''}
                                disabledDate={disabledDate}
                                format="DD/MM/YYYY"
                                onChange={(dates) => {
                                    if (dates && dates[0].isSame(dates[1])) {
                                        messageApi.open({
                                            content: "Start date and end date cannot be the same!",
                                            type: "warning",
                                            duration: 3,
                                        });
                                        setScoreTime(null);
                                    } else {
                                        setScoreTime(dates);
                                    }
                                }}
                                value={scoreTime}
                            />
                        </Col>

                        {/* banner */}
                        <Col span={24} className='flex flex-col justify-center items-center'>
                            <label className="text-base text-black mb-2">
                                <span className="text-red-600">* </span>
                                Show Banner:
                            </label>

                            <Upload
                                name="banner"
                                listType="picture-card"
                                className={`avatar-uploader ${errors.banner ? 'border border-red-500 rounded-lg' : ''}`}
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
                                                        width={205}
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

                            {errors.banner && (
                                <span className="mt-1 text-base text-red-500">
                                    {errors.banner.message}
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
                                Edit Show
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default EditShowModal