import React from 'react'
import { getLocalStorage, setLocalStorage } from '../../../../utils';
import { useOpenModal } from '../../../../hooks/useOpenModal';
import { Breadcrumb, Card, message } from 'antd';
import InfoModal from './InfoModal';
import PwModal from './PwModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../../../../apis/user.api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../redux/slices/user.slice';
import { PATH } from '../../../../routes/path';

const MyAccSettings = () => {

    const currentUser = getLocalStorage("user");

    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();

    const { isOpen: isOpenInfoModal, openModal: openInfoModal, closeModal: closeInfoModal } = useOpenModal();
    const { isOpen: isOpenPwModal, openModal: openPwModal, closeModal: closePwModal } = useOpenModal();

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
                            title: "My Account Settings",
                            href: PATH.PROFILE_MY_SETTINGS,
                        },
                    ]}
                />
            </div>

            <Card
                hoverable
                className='block h-fit'
            >
                <div className="flex flex-col items-center justify-center">
                    <img className="mx-auto w-36 h-36 object-cover rounded-full" alt="" src="/default-ava.png" />

                    <div className="flex justify-start items-center gap-3">
                        <img className="w-6" alt="" src="https://cdn-icons-png.flaticon.com/512/5972/5972778.png" />
                        <p className="font-bold text-xl">Email Verified</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="font-bold text-4xl text-black">General Information:</h1>

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

export default MyAccSettings