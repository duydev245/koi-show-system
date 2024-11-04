import { Image, Modal, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'

const SepayModal = ({
    isPending,
    sepayCode,
    isOpen,
    onCloseModal,
    handleCheckPayment,
}) => {
    const desc = sepayCode ? decodeURIComponent(sepayCode.split('&des=')[1]) : null;

    useEffect(() => {
        let intervalId;

        if (isOpen) {
            const checkPayment = () => {
                const desParam = sepayCode ? sepayCode.split('&des=')[1] : null;
                handleCheckPayment(desParam);
                intervalId = setTimeout(checkPayment, 5000); // 5s
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
                        Scan the QR to complete your payment
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={1000}
            >
                {/*  MBBank 00001205984 HOANG TRUNG TIN */}
                <div className='grid grid-cols-2'>
                    <div className="text-justify text-xl space-y-3 my-0 mx-auto">
                        <p><strong>Bank: </strong>MBBank</p>
                        <p><strong>Account Number: </strong>00001205984</p>
                        <p><strong>Account Name: </strong>HOANG TRUNG TIN</p>
                        <p><strong>Description: </strong>{desc}</p>
                    </div>
                    <div>
                        <Image
                            src={sepayCode}
                            alt="QR Code for Sepay"
                            className='w-full h-auto object-fit'
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default SepayModal