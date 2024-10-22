import { Image, Modal, Typography } from 'antd'
import React, { useEffect } from 'react'

const SepayModal = ({
    isPending,
    sepayCode,
    isOpen,
    onCloseModal,
    handleCheckPayment,
}) => {

    useEffect(() => {
        let intervalId;

        if (isOpen) {
            const checkPayment = () => {
                const desParam = sepayCode ? sepayCode.split('&des=')[1] : null;
                handleCheckPayment(desParam); 
                intervalId = setTimeout(checkPayment, 30000); // 30s
            };

            checkPayment(); // Start polling when modal opens
        }

        return () => {
            if (intervalId) clearTimeout(intervalId);
        };
    }, [isOpen, handleCheckPayment]);

    return (
        <>
            <Modal
                open={isOpen}
                loading={isPending}
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