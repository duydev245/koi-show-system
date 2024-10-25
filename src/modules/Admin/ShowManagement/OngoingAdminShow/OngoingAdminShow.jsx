import { Alert, Breadcrumb, Button, Card, Col, Image, message, Popconfirm, Row, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { showApi } from '../../../../apis/show.api';
import { PATH } from '../../../../routes/path';
import { groupApi } from '../../../../apis/group.api';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from "dayjs";
import { getStatusTag } from '../UpcomingAdminShow/UpcomingAdminShow';


const OngoingAdminShow = () => {

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { state } = useLocation();
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

  // dataGroupShow
  const { data: dataGroupShow, isLoading: isLoadingGroup } = useQuery({
    queryKey: ["data-group-show"],
    queryFn: () => groupApi.getListGroupByShowId(showId),
    enabled: !!showId,
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
              title: "Ongoing Show",
              href: '',
            },
          ]}
        />
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
                      
                      {/* information */}
                      <div className='text-lg space-y-3'>
                        <h3 className="font-bold text-xl">{group.groupName}</h3>
                        <p><strong>Group ID:</strong> {group.groupId}</p>
                        <p><strong>Size range:</strong> {group.sizeMin} cm - {group.sizeMax} cm</p>
                        <p><strong>Quantity registration:</strong> {group.quantity_registration}</p>
                        <p><strong>Quantity scored registration:</strong> {group.quantity_scored_registration}</p>

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
                          rowKey="id"
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
            title="Change status show"
            description="Are you sure to change this show status?"
            onConfirm={() => {
              handleChangeStatus({ showId: showId, status: "scoring" })
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
              Start Scoring
            </Button>
          </Popconfirm>
        )}
      </div>
    </>
  )
}

export default OngoingAdminShow