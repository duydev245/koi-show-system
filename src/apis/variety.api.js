import fetcherNoAuth from "./fetcherNoAuth";
import fetcher from "./fetcher";


export const varietyApi = {
    getAllVariety: async () => {
        try {
            const response = await fetcherNoAuth.get(
                `/Variety/get-all-varieties`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    postAddVariety: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Variety/create-variety`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    putUpdateKoiByUser: async (payload) => {
        try {
            const response = await fetcher.put(
                `/Variety/update-variety`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    deleteVariety: async (id) => {
        try {
            const response = await fetcher.delete(
                `/Variety/delete-variety?varietyId=${id}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}