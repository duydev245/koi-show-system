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

    getDraftKoi: async () => {
        try {
            const response = await fetcher.get(
                `/KoiRegistration/koi-registration?status=draft`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getInprocessKoi: async () => {
        try {
            const response = await fetcher.get(
                `/KoiRegistration/koi-registration?status=inprocess`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    getScoredKoi: async () => {
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