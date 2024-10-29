import fetcher from "./fetcher";

export const refereeApi = {

    getAllRefereeByShow: async (id) => {
        try {
            const response = await fetcher.get(
                `/Referee/get-all-referee-by-show?showId=${id}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getAllReferee: async () => {
        try {
            const response = await fetcher.get(
                `/Referee/get-all-referee`
            );

            return response.data?.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postAddRefereeToShowId: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Referee/add-referees-to-show?showId=${payload.showID}`, payload.referees
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    deleteRefereeFromShowId: async (id) => {
        try {
            const response = await fetcher.delete(
                `/Referee/remove-referee-from-show?refereeDetail=${id}`
            );

            return response.data;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}
