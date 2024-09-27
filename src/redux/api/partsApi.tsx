import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const partsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllParts: build.query({
      query: (page) => ({
        url: `/parts?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.parts],
    }),
    getAllListParts: build.query({
      query: () => ({
        url: `/parts/list`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.parts],
    }),
    getSingleParts: build.query({
      query: (id) => ({
        url: `/parts/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.parts],
    }),
    createParts: build.mutation({
      query: (createData) => ({
        url: "/parts",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.parts],
    }),
    updateParts: build.mutation({
      query: ({id, ...data}) => ({
        url: `/parts/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.parts],
    }),
    deleteParts: build.mutation({
      query: (id) => ({
        url: `/parts/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.parts],
    }),
  }),
});

export const {
    useGetAllPartsQuery,
    useGetAllListPartsQuery,
    useGetSinglePartsQuery,
    useCreatePartsMutation,
    useUpdatePartsMutation,
    useDeletePartsMutation
} = partsApi;
