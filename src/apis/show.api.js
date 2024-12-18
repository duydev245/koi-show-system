import { PAGE_SHOW_SIZE } from "../constants";
import fetcher from "./fetcher";
import fetcherNoAuth from "./fetcherNoAuth";

export const showApi = {

    getShowDetails: async (id) => {
        try {
            const response = await fetcherNoAuth.get(
                `/Show/show-by-id?showID=${id}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getListShow: async () => {
        try {
            const response = await fetcherNoAuth.get(
                `/Show/closest-show`);

            return response.data?.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getListSearchShow: async (payload) => {
        const params = {
            pageIndex: payload.pageIndex,
            pageSize: payload.pageSize || PAGE_SHOW_SIZE,
            keyword: payload.keyword
        };

        try {
            const response = await fetcherNoAuth.get(
                `/Show/search`,
                { params }
            );

            return response.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getListScored: async () => {
        try {
            const response = await fetcher.get(
                `/Show/list-show-by-user`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getAllListShow: async () => {
        try {
            const response = await fetcherNoAuth.get(
                `/Show/get-all-show`);

            return response.data?.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postAddShow: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Show/create-show`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postEditShow: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Show/update-show`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    deleteShow: async (id) => {
        try {
            const response = await fetcher.delete(
                `/Show/delete-show?showId=${id}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },


    postChangeStatusShow: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Show/change-status-show?status=${payload.status}&showId=${payload.showId}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postPublishScoreShow: async (showID) => {
        try {
            const response = await fetcher.post(
                `/Registration/publish-score?showId=${showID}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}