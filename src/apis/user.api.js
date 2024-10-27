import { PAGE_SIZE } from "../constants";
import fetcher from "./fetcher";
import fetcherNoAuth from "./fetcherNoAuth";

export const userApi = {

  login: async (data) => {
    try {
      const response = await fetcherNoAuth.post(
        `/Authentication/login`,
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
        `/Authentication/signup`,
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
        `/User/edit-profile`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  updatePasswordUser: async (payload) => {
    try {
      const response = await fetcher.put(
        `/User/change-password`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  },

  getListUser: async (payload) => {

    const params = {
      pageIndex: payload.pageIndex,
      pageSize: payload.pageSize || 10,
      // role: payload.role
    };

    try {
      const response = await fetcher.get(
        `/User/get-all-user`,
        { params }
      );

      return response.data?.payload;

    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  getListRole: async () => {

    try {
      const response = await fetcher.get(
        `/Role/get-all-roles`
      );

      return response.data?.payload;

    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  postCreateUser: async (payload) => {
    try {
      const response = await fetcher.post(
        "/User/create-user", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

  putChangeStatusUser: async (payload) => {
    try {
      const response = await fetcher.put(
        `/User/update-user-status?userId=${payload.id}&status=${payload.status}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.content);
    }
  },

};
