import { PAGE_SIZE } from "../constants";
import fetcher from "./fetcher";
import fetcherNoAuth from "./fetcherNoAuth";

export const userApi = {

  login: async (data) => {
    try {
      const response = await fetcherNoAuth.post(
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
      const response = await fetcherNoAuth.post(
        `/User/signup`,
        payload
      );

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  getInfoUser: async () => {
    try {
      const response = await fetcher.get(
        `/User/profile`
      );
      return response.data?.payload;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  updateInfoUser: async (payload) => {
    try {
      const response = await fetcher.put(
        `/User/edit-profile`,
        payload
      );

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },
  
  updatePasswordUser: async (payload) => {
    console.log("🚀 ~ updatePasswordUser: ~ payload:", payload)
    try {
      const response = await fetcher.put(
        `/User/change-password`,
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
