import { Button, Col, Form, Image, Input, Modal, Row, Typography } from 'antd'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

const ScoringModal = ({
    data,
    isOpen,
    onCloseModal,
    isPending,
    handleScoringApi,
}) => {
    // console.log("🚀 ~ data:", data)

    const [imgUrls, setImgUrls] = useState([]);
    const [criterions, setCriterions] = useState([]);

    useEffect(() => {
        if (data) {
            const newUrls = [data.image1, data.image2, data.image3].filter(Boolean);
            setImgUrls(newUrls);

            if (data.criterions && Array.isArray(data.criterions)) {
                setCriterions(data.criterions);
            }
        }
    }, [data]);

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        // resolver: yupResolver(schema),
        // criteriaMode: "all",
    });

    const onSubmit = (values) => {
        const payload = {
            registraionId: data?.registrationId,
            scores: criterions.map((criterion, index) => ({
                criterionId: criterion.criterionId,
                score: values.criterionScore[index] * 1 || 0,
            })),
        };
        // console.log("🚀 ~ onSubmit ~ payload:", payload)
        handleScoringApi(payload);
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
                    <Typography className="text-2xl font-bold text-red-600">
                        Scoring Koi Modal
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={800}
            >
                <Row gutter={[0, 10]}>
                    {/* reg id */}
                    <Col span={24} className='flex items-center justify-between'>
                        <label className="text-lg text-black font-semibold">
                            Registration ID:
                        </label>
                        <Input
                            readOnly
                            value={data?.registrationId}
                            type="text"
                            size="large"
                            className="mt-1 w-1/2"
                        />
                    </Col>
                    {/* koi name */}
                    <Col span={24} className='flex items-center justify-between'>
                        <label className="text-lg text-black font-semibold">
                            Koi Name:
                        </label>
                        <Input
                            readOnly
                            value={data?.koiName}
                            type="text"
                            size="large"
                            className="mt-1 w-1/2"
                        />
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
                            frameborder="0"
                        >
                        </iframe>

                    </Col>

                    <Col span={24}>
                        <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                            <Row gutter={[0, 10]}>
                                <Col span={24}>
                                    <Typography className="text-2xl font-bold text-red-600">
                                        Scoring (0-100/Criteria)
                                    </Typography>
                                </Col>

                                {criterions && criterions.map((criterion, index) => (
                                    <Col key={index} span={24} className='flex items-center justify-between'>
                                        <label className="text-lg text-black font-semibold">
                                            {criterion.criterionName} Criteria ({criterion.percentage}%):
                                        </label>
                                        <Controller
                                            name={`criterionScore[${index}]`}
                                            control={control}
                                            defaultValue={criterion.score || ''}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    size="large"
                                                    className="mt-1 w-1/2"
                                                />
                                            )}
                                        />
                                    </Col>
                                ))}
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
                                        Save score
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>

            </Modal>
        </>
    )
}

export default ScoringModal