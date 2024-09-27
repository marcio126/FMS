import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllReview: build.query({
      query: (page) => ({
        url: `/review?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.review],
    }),
    getSingleReview: build.query({
      query: (id) => ({
        url: `/review/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.review],
    }),
    createReview: build.mutation({
      query: (createData) => ({
        url: "/review",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    updateReview: build.mutation({
      query: ({id, ...data}) => ({
        url: `/review/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.review],
    }),
    deleteReview: build.mutation({
      query: (id) => ({
        url: `/review/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.review],
    }),
  }),
});

export const {
    useGetAllReviewQuery,
    useGetSingleReviewQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} = reviewApi;
