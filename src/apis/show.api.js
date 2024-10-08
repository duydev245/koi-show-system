import { PAGE_SHOW_SIZE, PAGE_SIZE } from "../constants";
import fetcher from "./fetcher";
import fetcherNoAuth from "./fetcherNoAuth";

export const showApi = {

    getShowDetails: async (id) => {
        try {
            const response = await fetcherNoAuth.get(
                `/KoiShow/show-detail?showID=${id}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getListKoiByShow: async (payload) => {
        const params = {
            pageIndex: payload.pageIndex,
            pageSize: payload.pageSize || PAGE_SIZE,
            showID: payload.showID * 1
        };

        try {
            const response = await fetcherNoAuth.get(
                `/KoiShow/koibyshow`,
                { params }
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getListShow: async () => {
        try {
            const response = await fetcherNoAuth.get(
                `/KoiShow/closest-show`);

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
                `/KoiShow/search`,
                { params }
            );

            return response.data;
        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}