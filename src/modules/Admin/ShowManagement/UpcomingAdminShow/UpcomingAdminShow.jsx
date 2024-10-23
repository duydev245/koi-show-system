import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../../../routes/path';
import { Alert, Breadcrumb, Button, Card, Image, message, Spin, Tag } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { showApi } from '../../../../apis/show.api';
import { EditOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { groupApi } from '../../../../apis/group.api';
import { useOpenModal } from '../../../../hooks/useOpenModal';
import EditShowModal from './EditShowModal';

const UpcomingAdminShow = () => {

  const [groupData, setGroupData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const { state } = useLocation();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { isOpen: isOpenEditShowModal, openModal: openEditShowModal, closeModal: closeEditShowModal } = useOpenModal();

  const handleCloseEditModal = () => {
    closeEditShowModal();
    setDataEdit({});
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
      handleCloseEditModal();
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

  const getStatusTag = (status) => {
    switch (status.toLowerCase()) {
      case 'up comming':
      case 'on going':
        return <Tag color="green">Upcoming</Tag>;
      case 'scoring':
        return <Tag color="yellow">Scoring</Tag>;
      case 'finished':
        return <Tag color="red">Finished</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

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

      <EditShowModal
        key={'edit-show'}
        data={dataEdit}
        isOpen={isOpenEditShowModal}
        onCloseModal={handleCloseEditModal}
        handleEditShowApi={handleEditShowApi}
        isPending={isPendingEdit}
      />

      <div className='space-y-3 mb-5'>
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

      <div>
        <h1 className='text-2xl font-bold'>Show groups</h1>
      </div>


      <div className='flex items-center justify-end mt-5'>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            alert(dataShow?.showId)
            // openAddShowModal()
          }}
        >
          Publish Show
        </Button>
      </div>



    </>
  )
}

export default UpcomingAdminShow