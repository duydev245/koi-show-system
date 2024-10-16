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
    
}