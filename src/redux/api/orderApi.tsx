import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllOrder: build.query({
      query: (page) => ({
        url: `/order?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.order],
    }),
    getSingleOrder: build.query({
      query: (id) => ({
        url: `/order/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.order],
    }),
    createOrder: build.mutation({
      query: (createData) => ({
        url: "/order",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    updateOrder: build.mutation({
      query: ({id, ...data}) => ({
        url: `/order/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.order],
    }),
    deleteOrder: build.mutation({
      query: (id) => ({
        url: `/order/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
    useGetAllOrderQuery,
    useGetSingleOrderQuery,
    useCreateOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = orderApi;
