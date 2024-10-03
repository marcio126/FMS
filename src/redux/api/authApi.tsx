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
    }),
    getProfile: build.query({
      query: (id) => ({
        url: `/auth/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.user],
    }),
    userResetPassword: build.mutation({
      query: (id) => ({
        url: `/auth/reset/${id}`,
        method: "PATCH", 
      }), 
      invalidatesTags: [tagTypes.user],
    }),
    userResetPasswordByEmail: build.mutation({
      query: (id) => ({
        url: `/auth/resetbyemail/${id}`,
        method: "PATCH", 
      }), 
      invalidatesTags: [tagTypes.user],
    }),
    getAll: build.query({
      query: () => ({
        url: `/auth/allUser`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.user],
    }),
    profileUpdate: build.mutation({
      query: ({id, ...data}) => ({
        url: `/auth/profileUpdate/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    userDelete: build.mutation({
      query: (id) => ({
        url: `/auth/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserRegisterMutation,
  useProfileUpdateMutation,
  useGetProfileQuery,
  useGetAllQuery,
  useUserDeleteMutation,
  useUserResetPasswordMutation,
  useUserResetPasswordByEmailMutation
} = authApi;
