import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCustomer: build.query({
      query: (page) => ({
        url: `/customer?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.customer],
    }),
    getSingleCustomer: build.query({
      query: (id) => ({
        url: `/customer/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.customer],
    }),
    createCustomer: build.mutation({
      query: (createData) => ({
        url: "/customer",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    updateCustomer: build.mutation({
      query: ({id, ...data}) => ({
        url: `/customer/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `/customer/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
});

export const {
    useGetAllCustomerQuery,
    useGetSingleCustomerQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation
} = customerApi;
