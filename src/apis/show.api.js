import { PAGE_SHOW_SIZE, PAGE_SIZE } from "../constants";
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
}