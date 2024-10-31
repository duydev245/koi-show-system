import { PAGE_SIZE } from "../constants";
import fetcher from "./fetcher";
import fetcherNoAuth from "./fetcherNoAuth";

export const registrationApi = {

    getListRegByShowId: async (payload) => {
        const params = {
            pageIndex: payload.pageIndex,
            pageSize: payload.pageSize || PAGE_SIZE,
            showID: payload.showID * 1
        };

        try {
            const response = await fetcherNoAuth.get(
                `/Registration/registrations-by-show`,
                { params }
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getRegDetails: async (id) => {
        try {
            const response = await fetcherNoAuth.get(
                `/Registration/registration-by-id?registrationId=${id}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postVoteReg: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Registration/vote?registrationId=${payload.id}&vote=${payload.status}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getListRegByUser: async (status) => {
        try {
            const response = await fetcher.get(
                `/Registration/registrations-by-member?status=${status}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postRegistration: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Registration/create-registration`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postScoringReg: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Score/save-scores`, payload
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getCheckIsPaid: async (payload) => {
        try {
            const response = await fetcher.get(
                `/Payment/IsAllMemberRegistrationsPaid?content=${payload}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getPendingRegList: async (payload) => {
        const params = {
            pageIndex: payload.pageIndex,
            pageSize: payload.pageSize || PAGE_SIZE, // 10
        };

        try {
            const response = await fetcher.get(
                `/Registration/pending-registration`,
                { params }
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    putEvaluateReg: async (payload) => {
        try {
            const response = await fetcher.put(
                `/Registration/update-registration`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    deleteDrafeReg: async (id) => {
        try {
            const response = await fetcher.delete(
                `/Registration/delete-draft-registration?registrationId=${id}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },


    getListRegByGroupId: async (payload) => {
        const params = {
            pageIndex: payload.pageIndex,
            pageSize: payload.pageSize || PAGE_SIZE,
            groupId: payload.groupId * 1
        };

        try {
            const response = await fetcherNoAuth.get(
                `/Registration/registrations-by-group`,
                { params }
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}