import fetcher from "./fetcher";
import fetcherNoAuth from "./fetcherNoAuth";

export const koiApi = {
    getKoiDetails: async (id) => {
        try {
            const response = await fetcherNoAuth.get(
                `/KoiShow/koi-detail?koiId=${id}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getInprocessShow: async () => {
        try {
            const response = await fetcher.get(
                `/KoiRegistration/koi-registration?status=inprocess`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getScoredShow: async () => {
        try {
            const response = await fetcher.get(
                `/KoiRegistration/koi-registration?status=scored`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}