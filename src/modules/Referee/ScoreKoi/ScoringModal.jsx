import { Button, Col, Form, Image, Input, Modal, Row, Typography } from 'antd'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

const ScoringModal = ({
    data,
    isOpen,
    onCloseModal,
    isPending,
    handleUpdateKoiApi,
}) => {
    console.log("🚀 ~ data:", data)

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
        defaultValues: {

        },
        // resolver: yupResolver(schema),
        // criteriaMode: "all",
    });

    const onSubmit = (values) => {
        console.log(values)
    };

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
                                    <div className='relative'>
                                        <div key={index} className='z-10 inset-0 absolute top-0'>
                                            <Image
                                                className='object-fit w-full'
                                                preview={true}
                                                src="/koi-1.jpg"
                                            />
                                        </div>
                                        <img
                                            src="/koi-1.jpg"
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
                            src="https://www.youtube.com/embed/PAEbwU9OrPk"
                            allowFullScreen
                            frameborder="0"
                        >
                        </iframe>

                    </Col>

                    <Col span={24}>
                        <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                            <Typography className="text-2xl font-bold text-red-600">
                                Scoring
                            </Typography>
                            <Row gutter={[0, 5]}>
                                {criterions && criterions.map((criterion, index) => (
                                    <Col key={index} span={24} className='flex items-center justify-between'>
                                        <label className="text-lg text-black font-semibold">
                                            {++index}. Criterion {criterion.criterionName}:
                                        </label>
                                        <Input
                                            type="number"
                                            size="large"
                                            value={criterion?.score || ''}
                                            className="mt-1 w-1/2"
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Form>
                    </Col>


                    <Col span={24} className="flex justify-end">
                        <Button size="large" type="default" onClick={onCloseModal}>
                            Cancel
                        </Button>

                        <Button
                            loading={false}
                            htmlType="submit"
                            size="large"
                            type="primary"
                            className="ml-3"
                        >
                            Save score
                        </Button>
                    </Col>
                </Row>

            </Modal>
        </>
    )
}

export default ScoringModal