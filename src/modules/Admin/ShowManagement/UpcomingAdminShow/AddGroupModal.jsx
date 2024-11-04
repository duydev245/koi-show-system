import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, Col, Form, Input, message, Modal, Popconfirm, Row, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useOpenModal } from '../../../../hooks/useOpenModal';
import AddCriterionModal from './AddCriterionModal';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import 'animate.css'
import EditCriterionModal from './EditCriterionModal';

const AddGroupModal = (
    {
        showId,
        isOpen,
        onCloseModal,
        isPending,
        handleAddGroupApi,
        dataVarieties
    }
) => {

    const [messageApi, contextHolder] = message.useMessage();
    const { isOpen: isOpenAddCriterionModal, openModal: openAddCriterionModal, closeModal: closeAddCriterionModal } = useOpenModal();
    const { isOpen: isOpenUpdateCriterionModal, openModal: openUpdateCriterionModal, closeModal: closeUpdateCriterionModal } = useOpenModal();

    const [groupVarieties, setGroupVarieties] = useState([]);

    // handleChangeCheckBox
    const handleVarietyChange = (varietyId) => {
        setGroupVarieties((prevSelected) => {
            if (prevSelected.includes(varietyId)) {
                return prevSelected.filter(id => id !== varietyId);
            } else {
                return [...prevSelected, varietyId];
            }
        });
    };

    const [groupCriteria, setGroupCriteria] = useState([]);
    const [editCriteria, setEditCriteria] = useState({});

    const handleCloseUpdateModal = () => {
        closeUpdateCriterionModal();
        setEditCriteria({});
    }

    const totalPercentage = groupCriteria.reduce((total, criterion) => total + criterion.percentage, 0);

    // Add Criterion
    const handleAddCriterion = (criterion) => {
        setGroupCriteria([...groupCriteria, { ...criterion, id: Date.now() }]);
        closeAddCriterionModal();
        messageApi.open({
            content: "Add Criterion successfully",
            type: "success",
            duration: 3,
        });
    };

    // Edit Criterion
    const handleUpdateCriterion = (updatedCriterion) => {
        setGroupCriteria(prevCriteria =>
            prevCriteria.map(criterion =>
                criterion.id === updatedCriterion.id ? { ...criterion, ...updatedCriterion } : criterion
            )
        );
        handleCloseUpdateModal();
        messageApi.open({
            content: "Update Criterion successfully",
            type: "success",
            duration: 3,
        });
    };

    // Delete Criterion
    const handleDeleteCriterion = (id) => {
        setGroupCriteria(groupCriteria.filter((criterion) => criterion.id !== id));
        messageApi.open({
            content: "Delete Criterion successfully",
            type: "success",
            duration: 3,
        });
    };

    // Table Criterion columns
    const columns = [
        {
            title: 'Name',
            width: 150,
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Percentage (%)',
            width: 150,
            key: 'percentage',
            dataIndex: 'percentage',
            render: (criterionPercentage) => {
                return (
                    <Typography>
                        {criterionPercentage}%
                    </Typography>
                )
            }
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            width: 100,
            key: 'action',
            render: (record) => (
                <div className="flex space-x-1">
                    <Button
                        type="default"
                        size='middle'
                        onClick={() => {
                            setEditCriteria(record);
                            openUpdateCriterionModal();
                        }}
                    >
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        title="Delete criterion"
                        description="Are you sure to delete this criterion?"
                        onConfirm={() => handleDeleteCriterion(record.id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="default" danger size='middle'>
                            <DeleteOutlined />
                        </Button>
                    </Popconfirm>
                </div>

            ),
        },
    ];

    const schema = yup.object({
        name: yup.string().trim().required("*Name is required!"),
        minSize: yup
            .number()
            .typeError('*Min Size must be a number!')
            .moreThan(14, '*Min Size must be over 14 cm!')
            .required("*Min Size is required!")
            .nullable(),
        maxSize: yup
            .number()
            .typeError('*Max Size must be a number!')
            .when('minSize', (minSize, schema) =>
                minSize
                    ? schema.moreThan(minSize, `*Max Size must be strictly greater than ${minSize} cm!`)
                    : schema
            ) // Ensure maxSize > minSize using `.moreThan()`
            .required("*Max Size is required!")
            .nullable(),
    });

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            minSize: "",
            maxSize: "",
        },
        resolver: yupResolver(schema),
        criteriaMode: "all",
    });

    const onSubmit = (values) => {

        if (groupCriteria.length == 0 || groupVarieties.length == 0) {
            messageApi.open({
                content: "Criteria or Varieties can't be empty!",
                type: "warning",
                duration: 3,
            });
            return;
        }

        if (totalPercentage !== 100) {
            messageApi.open({
                content: "Total percentage of all criterion must be exactly 100%!",
                type: "warning",
                duration: 3,
            });
            return;
        }

        const sanitizedCriteria = groupCriteria.map(({ id, ...rest }) => rest);
        const payload = {
            name: values.name,
            minSize: values.minSize * 1,
            maxSize: values.maxSize * 1,

            varieties: groupVarieties,
            criterias: sanitizedCriteria,
            showId: showId,
        };

        // console.log("🚀 ~ onSubmit ~ payload:", payload)

        handleAddGroupApi(payload);
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
            setGroupCriteria([]);
            setGroupVarieties([]);
        }
    }, [isOpen]);

    return (
        <>
            {contextHolder}
            <Modal
                open={isOpen}
                title={
                    <Typography className="text-xl font-medium">
                        Add group show modal
                    </Typography>
                }
                centered
                onCancel={onCloseModal}
                footer={null}
                width={900}
            >
                <Form className="my-4" onFinish={handleSubmit(onSubmit)}>
                    <Row gutter={[32, 12]}>
                        {/* Name */}
                        <Col span={24}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Group Name:
                            </label>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="text"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter group name..."
                                            status={errors.name ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.name && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.name.message}
                                </span>
                            )}
                        </Col>

                        {/* minSize */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Min Size (cm):
                            </label>
                            <Controller
                                name="minSize"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="number"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter min size..."
                                            status={errors.minSize ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.minSize && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.minSize.message}
                                </span>
                            )}
                        </Col>

                        {/* maxSize */}
                        <Col span={12}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Max Size (cm):
                            </label>
                            <Controller
                                name="maxSize"
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <Input
                                            {...field}
                                            type="number"
                                            size="large"
                                            className="mt-1"
                                            placeholder="Please enter max size..."
                                            status={errors.maxSize ? "error" : ""}
                                        />
                                    );
                                }}
                            />
                            {errors?.maxSize && (
                                <span className="mt-1 text-base text-red-500">
                                    {" "}
                                    {errors.maxSize.message}
                                </span>
                            )}
                        </Col>

                        {/* varieties */}
                        <Col span={24}>
                            <label className="text-base text-black">
                                <span className="text-red-600">* </span>
                                Choose varieties:
                            </label>
                            {/* dataVarieties */}
                            <div className='mt-1'>
                                {dataVarieties?.map(variety => (
                                    <div key={variety.varietyId} style={{ marginBottom: '8px' }} className='bg-gray-100 duration-300 hover:bg-gray-200 p-3 rounded-md'>
                                        <Checkbox
                                            className='text-base'
                                            checked={groupVarieties.includes(variety.varietyId)}
                                            onChange={() => handleVarietyChange(variety.varietyId)}
                                        >
                                            <p>- {variety.varietyName} ({variety.varietyOrigin})</p>
                                            <p className='text-justify ms-2'>+ {variety.varietyDescription}</p>
                                        </Checkbox>
                                    </div>
                                ))}
                            </div>
                        </Col>

                        {/* criterions */}
                        <Col span={24}>
                            <div className='flex justify-between items-center my-1'>
                                <label className="text-base text-black">
                                    <span className="text-red-600">* </span>
                                    Criteria:
                                </label>
                                <Button
                                    type='default'
                                    size='middle'
                                    disabled={(totalPercentage >= 100)}
                                    onClick={openAddCriterionModal}
                                >
                                    Add criterion
                                </Button>
                            </div>

                            {groupCriteria.length != 0 ? (
                                <Table
                                    rowKey={"id"}
                                    columns={columns}
                                    dataSource={groupCriteria}
                                    pagination={false}
                                />
                            ) : (
                                <Alert
                                    message="Notification"
                                    description="Please add critetion!"
                                    type="warning"
                                    showIcon
                                />
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
                                Add Group
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <AddCriterionModal
                key={'adding-criterion'}
                isOpen={isOpenAddCriterionModal}
                onCloseModal={closeAddCriterionModal}
                handleAddCriterion={handleAddCriterion}
            />

            <EditCriterionModal
                key={'editing-criterion'}
                data={editCriteria}
                isOpen={isOpenUpdateCriterionModal}
                onCloseModal={handleCloseUpdateModal}
                handleUpdateCriterion={handleUpdateCriterion}
            />
        </>
    )
}

export default AddGroupModal