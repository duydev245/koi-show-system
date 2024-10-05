import { PAGE_SIZE } from "../constants";
import fetcher from "./fetcher";

export const userApi = {

  login: async (data) => {
    try {
      const response = await fetcher.post(
        `/User/login`,
        data
      );

      return response.data;

    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  register: async (payload) => {
    try {
      const response = await fetcher.post(
        `/User/signup`,
        payload
      );

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  // getListUser: async () => {
  //   try {
  //     const response = await fetcher.get(
  //       `/users`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw Error(error.response.data.content);
  //   }
  // },

  getInfoUser: async () => {
    try {
      const response = await fetcher.get(
        `/User/profile`
      );
      return response.data?.payload;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  // addUser: async (payload) => {
  //   try {
  //     const response = await fetcher.post(
  //       "/users",
  //       payload
  //     );

  //     return response.data.content;
  //   } catch (error) {
  //     throw Error(error.response.data.content);
  //   }
  // },

  // updateUser: async (payload) => {
  //   try {
  //     const response = await fetcher.put(
  //       `/users/${payload.id}`,
  //       payload
  //     );

  //     return response.data.content;
  //   } catch (error) {
  //     throw Error(error.response.data.content);
  //   }
  // },

  // deleteUser: async (idUser) => {
  //   try {
  //     const response = await fetcher.delete(
  //       `/users?id=${idUser}`
  //     );
  //     return response.data.content;
  //   } catch (error) {
  //     throw Error(error.response.data.content);
  //   }
  // },

  // uploadAvatar: async (payload) => {
  //   try {
  //     const response = await fetcher.post(`users/upload-avatar`, payload, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     return response.data.content
  //   } catch (error) {
  //     throw Error(error.response.data.content);
  //   }
  // },

};
