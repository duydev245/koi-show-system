import React from 'react'
import { getLocalStorage } from '../../../../utils';
import { useOpenModal } from '../../../../hooks/useOpenModal';

const MyAccSettings = () => {

    const currentUser = getLocalStorage("user");

    const { isOpen: isOpenInfoModal, openModal: openInfoModal, closeModal: closeInfoModal } = useOpenModal();
    const { isOpen: isOpenPwModal, openModal: openPwModal, closeModal: closePwModal } = useOpenModal();

    // dataUser
    // const { data: dataUser, isLoading: isLoadingUser, error } = useQuery({
    //     queryKey: ["info-user"],
    //     queryFn: () => userApi.getInfoUser(),
    // });

        // update info api
    // const { mutate: handleUpdateUserApi, isPending: isPendingUpdate } = useMutation({
    //     mutationFn: (payload) => userApi.updateInfoUser(payload),
    //     onSuccess: (data) => {
    //         setLocalStorage("user", data?.payload);
    //         dispatch(setUser(data?.payload));
    //         messageApi.open({
    //             content: data?.message || "Update successfully",
    //             type: "success",
    //             duration: 3,
    //         });
    //         closeInfoModal();
    //         queryClient.refetchQueries({
    //             queryKey: ["info-user"],
    //             type: "active",
    //         });
    //     },
    //     onError: (error) => {
    //         messageApi.open({
    //             content: error?.message,
    //             type: "error",
    //             duration: 3,
    //         });
    //     },
    // });

    // update password info api
    // const { mutate: handleUpdatePass, isPending: isPendingUpdatePass } = useMutation({
    //     mutationFn: (payload) => userApi.updatePasswordUser(payload),
    //     onSuccess: (data) => {
    //         messageApi.open({
    //             content: data?.message || "Update successfully",
    //             type: "success",
    //             duration: 3,
    //         });
    //         closePwModal();
    //     },
    //     onError: (error) => {
    //         messageApi.open({
    //             content: error?.message,
    //             type: "error",
    //             duration: 3,
    //         });
    //     },
    // });


    return (
        <div>MyAccSettings</div>
    )
}

export default MyAccSettings