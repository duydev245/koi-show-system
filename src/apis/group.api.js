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


}