import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: "/auth/signIn",
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userRegister: build.mutation({
      query: (registerData) => ({
        url: "/auth/register",
        method: "POST",
        data: registerData,
      }),
      invalidatesTags: [tagTypes.user],
    })
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation
} = authApi;
