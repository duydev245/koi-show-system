import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, message, Table, Tag, Typography } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getLocalStorage, setLocalStorage } from '../../../utils';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { useOpenModal } from '../../../hooks/useOpenModal';
import InfoModal from './InfoModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../../apis/user.api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/user.slice';
import PwModal from './PwModal';
import InprocessTable from './InprocessTable';
import { koiApi } from '../../../apis/koi.api';
import ScoredTable from './ScoredTable';

const ProfilePage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    const { isOpen: isOpenInfoModal, openModal: openInfoModal, closeModal: closeInfoModal } = useOpenModal();
    const { isOpen: isOpenPwModal, openModal: openPwModal, closeModal: closePwModal } = useOpenModal();

    const currentUser = getLocalStorage("user");

    // dataUser
    const { data: dataUser, isLoading: isLoadingUser, error } = useQuery({
        queryKey: ["info-user"],
        queryFn: () => userApi.getInfoUser(),
    });

    // update info api
    const { mutate: handleUpdateUserApi, isPending: isPendingUpdate } = useMutation({
        mutationFn: (payload) => userApi.updateInfoUser(payload),
        onSuccess: (data) => {
            setLocalStorage("user", data?.payload);
            dispatch(setUser(data?.payload));
            messageApi.open({
                content: data?.message || "Update successfully",
                type: "success",
                duration: 3,
            });
            closeInfoModal();
            queryClient.refetchQueries({
                queryKey: ["info-user"],
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

    // update password info api
    const { mutate: handleUpdatePass, isPending: isPendingUpdatePass } = useMutation({
        mutationFn: (payload) => userApi.updatePasswordUser(payload),
        onSuccess: (data) => {
            messageApi.open({
                content: data?.message || "Update successfully",
                type: "success",
                duration: 3,
            });
            closePwModal();
        },
        onError: (error) => {
            messageApi.open({
                content: error?.message,
                type: "error",
                duration: 3,
            });
        },
    });

    // dataSourceProcessing
    const { data: dataSourceProcessing, isLoading: isLoadingProcess } = useQuery({
        queryKey: ["list-processing"],
        queryFn: () => koiApi.getInprocessKoi(),
    });

    // dataSourceScored
    const { data: dataSourceScored, isLoading: isLoadingScored } = useQuery({
        queryKey: ["list-scored"],
        queryFn: () => koiApi.getScoredKoi(),
    });


    return (
        <>
            {contextHolder}
            <div className="container mx-auto grid lg:flex gap-10 py-5">
                {/* left section */}
                <Card
                    className='basis-3/12 block lg:sticky top-0 lg:top-20 h-fit border-gray-200 '
                >
                    {/* avatar user (optional) */}
                    <div className="space-y-3">
                        <img className="mx-auto w-36 h-36 object-cover rounded-full" alt="" src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
                    </div>

                    <div className="space-y-4 mt-3">

                        <div className="flex justify-start items-center gap-3">
                            <img className="w-6" alt="" src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png" />
                            <p className="font-bold text-xl">Email Verified</p>
                        </div>

                        <div className='space-y-1'>
                            <button onClick={openInfoModal} className="w-auto underline font-bold text-base block">Edit profile</button>
                            <button onClick={openPwModal} className="w-auto underline font-bold text-base block">Change password</button>
                        </div>

                        <div className='text-lg'>
                            <p className="font-semibold text-gray-500">Your name:</p>
                            <p className="font-semibold">{currentUser.name}</p>
                        </div>
                        <div className='text-lg'>
                            <p className="font-semibold text-gray-500">Email address:</p>
                            <p className="font-semibold">{currentUser.email}</p>
                        </div>
                        <div className='text-lg'>
                            <p className="font-semibold text-gray-500">Phone number:</p>
                            <p className="font-semibold">{currentUser.phone}</p>
                        </div>
                    </div>
                </Card>

                {/* right section */}
                <div className='basis-9/12 space-y-4'>
                    {/* Processing Registration */}
                    <InprocessTable
                        dataSource={dataSourceProcessing}
                        isLoading={isLoadingProcess}
                    />


                    {/* Completed Registration */}
                    <ScoredTable
                        dataSource={dataSourceScored}
                        isLoading={isLoadingScored}
                    />

                </div>
            </div>

            <InfoModal
                key={"update"}
                data={dataUser}
                isOpen={isOpenInfoModal}
                onCloseModal={closeInfoModal}
                isPending={isPendingUpdate}
                handleUpdateUserApi={handleUpdateUserApi}
            />

            <PwModal
                key={"updatePass"}
                isOpen={isOpenPwModal}
                onCloseModal={closePwModal}
                isPending={isPendingUpdatePass}
                handleUpdatePass={handleUpdatePass}
            />
        </>
    )
}

export default ProfilePage
