import { Alert, Button } from 'antd';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const OngoingAdminShow = () => {
  const navigate = useNavigate();
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

  return (
    <div>OngoingAdminShow</div>
  )
}

export default OngoingAdminShow