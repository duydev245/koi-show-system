import { Button, Checkbox, Col, Modal, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import 'animate.css'

const AddRefereeModal = (
    {
        showId,
        isOpen,
        onCloseModal,
        isPending,
        handleAddGroupApi,
        dataReferee
    }
) => {

    const [groupReferee, setGroupReferee] = useState([]);

    // handleRefereeChange
    const handleRefereeChange = (id) => {
        setGroupReferee((prevSelected) => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(refId => refId !== id);
            } else {
                return [...prevSelected, id];
            }
        });
    };

    const onSubmit = () => {
        const payload = {
            showID: showId,
            referees: groupReferee,
        }
        // console.log("🚀 ~ onSubmit ~ payload:", payload)

        handleAddGroupApi(payload);
    }

    useEffect(() => {
        if (!isOpen) {
            setGroupReferee([]);
        }
    }, [isOpen]);

    return (
        <>
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-xl font-medium">
                        Add referee modal
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={900}
            >
                <Row gutter={[32, 12]}>
                    <Col span={24}>
                        <label className="text-lg text-black font-semibold">
                            <span className="text-red-600">* </span>
                            Choose referee:
                        </label>
                        {/* dataReferee */}
                        <div className='mt-1'>
                            {dataReferee.map(ref => (
                                <div key={ref.id} style={{ marginBottom: '8px' }} className='bg-gray-100 duration-300 hover:bg-gray-200 p-3 rounded-md'>
                                    <Checkbox
                                        className='text-base font-semibold'
                                        checked={groupReferee.includes(ref.id)}
                                        onChange={() => handleRefereeChange(ref.id)}
                                    >
                                        {ref.name}
                                    </Checkbox>
                                </div>
                            ))}
                        </div>
                    </Col>
                    <Col span={24} className="flex justify-end">
                        <Button size="large" type="default" onClick={onCloseModal}>
                            Cancel
                        </Button>
                        <Button
                            loading={isPending}
                            onClick={onSubmit}
                            size="large"
                            type="primary"
                            className="ml-3"
                        >
                            Add Referee
                        </Button>
                    </Col>
                </Row>

            </Modal>
        </>
    )
}

export default AddRefereeModal