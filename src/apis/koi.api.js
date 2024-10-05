import fetcher from "./fetcher";

export const koiApi = {
    getKoiDetails: async (id) => {
        try {
            const response = await fetcher.get(
                `/KoiShow/koi-detail?koiId=${id}`
            );

            return response.data.payload;

        } catch (error) {
            throw Error(error.response.data.message);
        }
    },
}