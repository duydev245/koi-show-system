import { Button, Col, Image, Modal, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const ViewMediaRegModal = (
    {
        data,
        isOpen,
        onCloseModal,
    }
) => {
    // console.log("🚀 ~ data:", data)

    const [imgUrls, setImgUrls] = useState([]);

    useEffect(() => {
        if (data) {
            const newUrls = [data.image1, data.image2, data.image3].filter(Boolean);
            setImgUrls(newUrls);
        }
    }, [data]);

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-xl font-medium">
                        View {data?.name}'s media
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={800}
            >
                <Row gutter={[0, 10]}>
                    {/* koi images */}
                    <Col span={24} className='grid grid-cols-1'>
                        <label className="text-lg text-black font-semibold mb-1">
                            Images:
                        </label>

                        <div className='grid grid-cols-3 gap-2'>
                            {imgUrls && (
                                imgUrls.map((url, index) => (
                                    <Image
                                        key={index}
                                        src={url}
                                        className='object-fit w-full'
                                    />
                                ))
                            )}
                        </div>
                    </Col>

                    {/* koi video */}
                    <Col span={24} className='grid grid-cols-1 space-y-3'>
                        <label className="text-lg text-black font-semibold">
                            Video:
                        </label>

                        <iframe
                            className='w-full h-[500px]'
                            src={data.video}
                            allowFullScreen
                        >
                        </iframe>
                    </Col>

                    <Col span={24} className="flex justify-end">
                        <Button size="large" type="default" onClick={onCloseModal}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default ViewMediaRegModal