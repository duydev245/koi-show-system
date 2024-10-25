import fetcher from "./fetcher";
import fetcherNoAuth from "./fetcherNoAuth";

export const groupApi = {

    getListGroupByShowId: async (showID) => {
        try {
            const response = await fetcherNoAuth.get(
                `/Group/get-all-groups-by-show?showId=${showID}`,
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postAddGroupByShowId: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Group/add-group`, payload
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    putEditGroupByShowId: async (payload) => {
        try {
            const response = await fetcher.put(
                `/Group/update-group`, payload
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    deleteGroupByShowId: async (id) => {
        try {
            const response = await fetcher.delete(
                `/Group/delete-group?groupId=${id}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getReviewGroupScoreByShowId: async (showID) => {
        try {
            const response = await fetcher.get(
                `/Group/review-group-score?showId=${showID}`,
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}