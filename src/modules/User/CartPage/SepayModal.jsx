import { Image, Modal, Typography } from 'antd'
import React from 'react'

const SepayModal = ({
    sepayCode,
    isOpen,
    onCloseModal,
}) => {
    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-2xl font-bold text-center">
                        Scan the QR to complete your registration
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={800}
            >
                <div className='grid grid-cols-1'>
                    {sepayCode ? (
                        <Image
                            src={sepayCode}
                            alt="QR Code for Sepay"
                            className='w-full h-auto object-fit'
                        />
                    ) : (
                        <Typography className="text-center text-red-500">
                            No QR code available.
                        </Typography>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default SepayModal