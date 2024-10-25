import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../../../routes/path';
import { Alert, Breadcrumb, Button, Card, Col, Image, message, Popconfirm, Row, Spin, Table, Tag, Typography } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { showApi } from '../../../../apis/show.api';
import { DeleteOutlined, EditOutlined, PlusSquareOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { groupApi } from '../../../../apis/group.api';
import { useOpenModal } from '../../../../hooks/useOpenModal';
import EditShowModal from './EditShowModal';
import AddGroupModal from './AddGroupModal';
import { varietyApi } from '../../../../apis/variety.api';
import EditGroupModal from './EditGroupModal';

export const getStatusTag = (status) => {
  switch (status.toLowerCase()) {
    case 'up comming':
      return <Tag color="green">Upcoming</Tag>;
    case 'on going':
      return <Tag color="green">Ongoing</Tag>;
    case 'scoring':
      return <Tag color="yellow">Scoring</Tag>;
    case 'finished':
      return <Tag color="red">Finished</Tag>;
    default:
      return <Tag>Unknown</Tag>;
  }
};

const UpcomingAdminShow = () => {

  const [dataEdit, setDataEdit] = useState({});
  const [dataGroupEdit, setDataGroupEdit] = useState({});

  const queryClient = useQueryClient();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { isOpen: isOpenEditShowModal, openModal: openEditShowModal, closeModal: closeEditShowModal } = useOpenModal();

  const { isOpen: isOpenAddGroupModal, openModal: openAddGroupModal, closeModal: closeAddGroupModal } = useOpenModal();
  const { isOpen: isOpenEditGroupModal, openModal: openEditGroupModal, closeModal: closeEditGroupModal } = useOpenModal();

  const handleCloseEditShowModal = () => {
    closeEditShowModal();
    setDataEdit({});
  }

  const handleCloseEditGroupModal = () => {
    closeEditGroupModal();
    setDataGroupEdit({});
  }

  const showId = state?.showId;

  if (!showId) {
    return (
      <div>
        <Alert
          message="Notification"
          description="Please choose show first!"
          type="warning"
          showIcon
        />
        <Button
          size='large'
          block
          type="primary"
          className="mt-3"
          onClick={() => navigate(PATH.ADMIN_SHOW)}
        >
          Go to Show management page
        </Button>
      </div>
    )
  }

  // dataShow
  const { data: dataShow, isLoading: isLoadingShow, error } = useQuery({
    queryKey: ["data-show"],
    queryFn: () => showApi.getShowDetails(showId),
    enabled: !!showId,
  });

  // handleEditShowApi
  const { mutate: handleEditShowApi, isPending: isPendingEdit } = useMutation({
    mutationFn: (payload) => showApi.postEditShow(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Edit Show successfully",
        type: "success",
        duration: 3,
      });
      handleCloseEditShowModal();
      setTimeout(() => navigate(PATH.ADMIN_SHOW), 1500);
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // handleChangeStatus
  const { mutate: handleChangeStatus, isPending: isChanging } = useMutation({
    mutationFn: (payload) => showApi.postChangeStatusShow(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Publish Show successfully",
        type: "success",
        duration: 3,
      });
      setTimeout(() => navigate(PATH.ADMIN_SHOW), 1500);
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // dataShowVariety
  const { data: dataShowVariety, isLoading: isLoadingListVariety } = useQuery({
    queryKey: ["data-show-variety"],
    queryFn: () => varietyApi.getAllVarietyByShow(showId),
    enabled: !!showId,
  });

  // dataAllVariety
  const { data: dataAllVariety, isLoading: isLoadingListAllVariety } = useQuery({
    queryKey: ["data-all-variety"],
    queryFn: () => varietyApi.getAllVariety(),
    enabled: !!showId,
  });

  // Filter varieties that not exist in show
  let dataVarieties = []
  if (!isLoadingListVariety && !isLoadingListAllVariety && dataShowVariety && dataAllVariety) {
    dataVarieties = dataAllVariety.filter(variety =>
      !dataShowVariety.some(showVariety => showVariety.varietyId === variety.varietyId)
    );
  }

  // dataGroupShow
  const { data: dataGroupShow, isLoading: isLoadingGroup } = useQuery({
    queryKey: ["data-group-show"],
    queryFn: () => groupApi.getListGroupByShowId(showId),
    enabled: !!showId,
  });

  // handleAddGroupApi
  const { mutate: handleAddGroupApi, isPending: isPendingAddGroup } = useMutation({
    mutationFn: (payload) => groupApi.postAddGroupByShowId(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Add Group Show successfully",
        type: "success",
        duration: 3,
      });
      closeAddGroupModal();
      queryClient.refetchQueries({
        queryKey: ["data-group-show"],
        type: "active",
      });
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // handleEditGroupApi
  const { mutate: handleEditGroupApi, isPending: isPendingEditGroup } = useMutation({
    mutationFn: (payload) => groupApi.putEditGroupByShowId(payload),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Add Group Show successfully",
        type: "success",
        duration: 3,
      });
      handleCloseEditGroupModal();
      queryClient.refetchQueries({
        queryKey: ["data-group-show"],
        type: "active",
      });
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  // handleDeleteGroupApi
  const { mutate: handleDeleteGroupApi, isPending: isPendingDeleteGroup } = useMutation({
    mutationFn: (id) => groupApi.deleteGroupByShowId(id),
    onSuccess: (data) => {
      messageApi.open({
        content: data?.message || "Delete Group Show successfully",
        type: "success",
        duration: 3,
      });
      queryClient.refetchQueries({
        queryKey: ["data-group-show"],
        type: "active",
      });
    },
    onError: (error) => {
      messageApi.open({
        content: error?.message,
        type: "error",
        duration: 3,
      });
    },
  });

  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    if (dataGroupShow) {
      setGroupData(dataGroupShow);
    }
  }, [dataGroupShow]);

  if (isLoadingShow) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin tip="Loading..." />
      </div>
    );
  }

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
      {contextHolder}
      <div className="flex items-center justify-between mb-2">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: "Upcoming Show",
              href: '',
            },
          ]}
        />

        <Button
          size="large"
          type="primary"
          onClick={() => {
            setDataEdit(dataShow);
            openEditShowModal()
          }}
        >
          <EditOutlined />
        </Button>
      </div>

      {/* Show information */}
      <div className='space-y-3 mb-5'>

        <h3 className="font-medium text-3xl">Show information:</h3>

        <Image height={450} width={'100%'} alt="show banner" src={dataShow?.showBanner} className="object-cover" />

        <div className='text-lg space-y-3'>
          <p><strong>Title:</strong> {dataShow?.showTitle}</p>
          <p><strong>Status:</strong> {getStatusTag(dataShow?.showStatus)}</p>
          <p><strong>Description:</strong> {dataShow?.showDesc}</p>
          <p><strong>Entrance Fee:</strong> {dataShow?.entranceFee.toLocaleString()} VND</p>

          <p>
            <strong>Registration Time: </strong>
            {dayjs(dataShow?.registrationStartDate).format('DD/MM/YYYY')} - {dayjs(dataShow?.registrationCloseDate).format('DD/MM/YYYY')}
          </p>

          <p>
            <strong>Scoring Time: </strong>
            {dayjs(dataShow?.startDate).format('DD/MM/YYYY')} - {dayjs(dataShow?.endDate).format('DD/MM/YYYY')}
          </p>

        </div>
      </div>

      <hr />

      {/* Show group */}
      <div className='space-y-3 my-5'>
        <div className='flex items-center justify-between'>
          <h3 className="font-medium text-3xl">Show group:</h3>
          <Button
            size="large"
            type="primary"
            onClick={openAddGroupModal}
          >
            Add Group
          </Button>
        </div>
        {
          groupData.length != 0 ? (
            <Row gutter={[12, 12]}>
              {groupData?.map((group, index) => {

                const groupVarieties = group?.varieties;
                const columnVarieties = [
                  {
                    title: 'Variety ID',
                    key: 'varietyId',
                    dataIndex: 'varietyId',
                  },
                  {
                    title: 'Variety Name',
                    key: 'varietyName',
                    dataIndex: 'varietyName',
                  },
                ];

                const groupCriterions = group?.criterion;
                const columnCriterions = [
                  {
                    title: 'Criterion ID',
                    width: 110,
                    key: 'criterionId',
                    dataIndex: 'id',
                  },
                  {
                    title: 'Criterion Name',
                    width: 200,
                    key: 'name',
                    dataIndex: 'name',
                  },
                  {
                    title: 'Percentage (%)',
                    width: 150,
                    key: 'percentage',
                    dataIndex: 'percentage',
                    render: (percentage) => {
                      return (
                        <Typography>
                          {percentage}%
                        </Typography>
                      )
                    }
                  },
                  {
                    title: 'Description',
                    key: 'description',
                    dataIndex: 'description',
                  },
                ]

                return (
                  <Col key={index} span={24}>
                    <Card hoverable className='relative'>
                      {/* btn action */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '0',
                          right: '0',
                          fontSize: '18px',
                        }}
                      >

                        <Button
                          size="large"
                          type="primary"
                          onClick={() => {
                            setDataGroupEdit(group);
                            openEditGroupModal();
                          }}
                        >
                          <EditOutlined />
                        </Button>
                        {/* delete btn */}
                        <Popconfirm
                          title="Delete group"
                          description="Are you sure to delete this group?"
                          onConfirm={() => {
                            handleDeleteGroupApi(group.groupId);
                          }}
                          onCancel={() => { }}
                          placement="top"
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type="primary"
                            size="large"
                            danger
                            disabled={isPendingDeleteGroup}
                          >
                            <DeleteOutlined />
                          </Button>
                        </Popconfirm>
                      </div>
                      {/* information */}
                      <div className='text-lg space-y-3'>
                        <h3 className="font-bold text-xl">{group.groupName}</h3>
                        <p><strong>Group ID:</strong> {group.groupId}</p>
                        <p><strong>Size range:</strong> {group.sizeMin} cm - {group.sizeMax} cm</p>
                        {/* <p><strong>Quantity registration:</strong> {group.quantity_registration}</p>
                        <p><strong>Quantity scored registration:</strong> {group.quantity_scored_registration}</p> */}

                        {/* Group Varieties */}
                        <p><strong>Varieties:</strong></p>
                        <Table
                          rowKey="varietyId"
                          columns={columnVarieties}
                          dataSource={groupVarieties}
                          pagination={false}
                        />

                        {/* Group criterions */}
                        <p><strong>Criterions:</strong></p>

                        <Table
                          rowKey="criterionId"
                          columns={columnCriterions}
                          dataSource={groupCriterions}
                          pagination={false}
                        />
                      </div>
                    </Card>
                  </Col>
                )
              })}
            </Row>
          ) : (
            <Alert
              message="Warning"
              description="This show has not had any group yet!"
              type="warning"
              showIcon
            />
          )
        }

      </div>

      {/* button action */}
      <div className='flex items-center justify-end mt-5 space-x-3'>
        <Button
          size="large"
          type="default"
          onClick={() => navigate(PATH.ADMIN_SHOW)}
        >
          Back to Show management page
        </Button>

        {groupData.length != 0 && (
          <Popconfirm
            title="Publish Show"
            description="Are you sure to publish this show?"
            onConfirm={() => {
              handleChangeStatus({ showId: showId, status: "on going" })
            }}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button
              size="large"
              type="primary"
              loading={isChanging}
            >
              Publish Show
            </Button>
          </Popconfirm>
        )}
      </div>

      <AddGroupModal
        key={'add-group'}
        showId={showId}
        isOpen={isOpenAddGroupModal}
        onCloseModal={closeAddGroupModal}
        dataVarieties={dataVarieties}
        handleAddGroupApi={handleAddGroupApi}
        isPending={isPendingAddGroup}
      />

      <EditGroupModal
        key={'edit-group'}
        showId={showId}
        data={dataGroupEdit}
        isOpen={isOpenEditGroupModal}
        onCloseModal={handleCloseEditGroupModal}
        dataVarieties={dataAllVariety}
        handleEditGroupApi={handleEditGroupApi}
        isPending={isPendingEditGroup}
      />

      <EditShowModal
        key={'edit-show'}
        data={dataEdit}
        isOpen={isOpenEditShowModal}
        onCloseModal={handleCloseEditShowModal}
        handleEditShowApi={handleEditShowApi}
        isPending={isPendingEdit}
      />

    </>
  )
}

export default UpcomingAdminShow