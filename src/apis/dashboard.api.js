import { TOTAL_SHOW_RECENT } from "../constants";
import fetcher from "./fetcher";

export const dashboardApi = {

    getRevenue: async (totalShow) => {

        const params = {
            quantityOfRecentShow: totalShow || TOTAL_SHOW_RECENT
        };

        try {
            const response = await fetcher.get(
                `/Dashboard/renevnue-of-shows`,
                { params }
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
    
    getQuantityRegByShow: async (totalShow) => {

        const params = {
            quantityOfRecentShow: totalShow || TOTAL_SHOW_RECENT
        };

        try {
            const response = await fetcher.get(
                `/Dashboard/quantity-registrations-of-shows`,
                { params }
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
   
    getQuantityVariety: async (totalShow) => {

        const params = {
            quantityOfRecentShow: totalShow || TOTAL_SHOW_RECENT
        };

        try {
            const response = await fetcher.get(
                `/Dashboard/quantity-of-each-variety-in-shows`,
                { params }
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}
