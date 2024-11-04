import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { registrationApi } from '../../../apis/registration.api';
import { Alert, Modal, Spin, Typography } from 'antd';
import dayjs from 'dayjs';

const ContactModal = (
    {
        idReg,
        isOpen,
        onCloseModal,
    }
) => {

    // dataContact
    const { data: dataContact, isFetching, error } = useQuery({
        queryKey: ["data-contact", idReg],
        queryFn: () => registrationApi.getRegContactDetails(idReg),
        enabled: !!idReg,
    });
    // console.log("🚀 ~ dataContact:", dataContact)

    if (error) {
        return (
            <Alert
                message="Warning"
                description="Something went wrong..."
                type="warning"
                showIcon
            />
        );
    }

    return (
        <>
            <Modal
                open={isOpen}
                loading={isFetching}
                title={
                    <Typography className="text-2xl font-bold">
                        Contact information
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={800}
            >
                {isFetching ? (
                    <Spin tip="Loading..." />
                ) : (
                    <div className="text-xl space-y-3">
                        <p><strong>Name: </strong>{dataContact?.name || 'N/A'}</p>
                        <p><strong>Email: </strong>{dataContact?.email || 'N/A'}</p>
                        <p><strong>Phone: </strong>{dataContact?.phone || 'N/A'}</p>
                        <p><strong>Date of Birth: </strong>{dayjs(dataContact?.dateOfBirth).format("DD-MM-YYYY") || 'N/A'}</p>
                        <p><strong>Gender: </strong>{dataContact?.gender ? 'Male' : 'Female'}</p>
                    </div>
                )}
            </Modal>
        </>
    )
}

export default ContactModal