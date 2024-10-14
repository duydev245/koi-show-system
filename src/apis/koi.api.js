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

    getListKoiByUser: async () => {
        try {
            const response = await fetcher.get(
                `/Koi/get-koi-by-user`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

    addKoiByUser: async (payload) => {
        try {
            const response = await fetcher.post(
                `/Koi/create-koi`, payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },

}