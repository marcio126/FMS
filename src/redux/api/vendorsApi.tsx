import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const vendorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVendors: build.query({
      query: (page) => ({
        url: `/vendors?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vendors],
    }),
    getAllListVendors: build.query({
      query: () => ({
        url: `/vendors/list`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vendors],
    }),
    getSingleVendors: build.query({
      query: (id) => ({
        url: `/vendors/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vendors],
    }),
    createVendors: build.mutation({
      query: (createData) => ({
        url: "/vendors",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.vendors],
    }),
    updateVendors: build.mutation({
      query: ({id, ...data}) => ({
        url: `/vendors/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.vendors],
    }),
    deleteVendors: build.mutation({
      query: (id) => ({
        url: `/vendors/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.vendors],
    }),
  }),
});

export const {
    useGetAllVendorsQuery,
    useGetAllListVendorsQuery,
    useGetSingleVendorsQuery,
    useCreateVendorsMutation,
    useUpdateVendorsMutation,
    useDeleteVendorsMutation
} = vendorsApi;
