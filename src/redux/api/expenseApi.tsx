import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const expenseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllExpense: build.query({
      query: (page) => ({
        url: `/expense/list?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.expense],
    }),
    getSingleExpense: build.query({
      query: (id) => ({
        url: `/expense/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.expense],
    }),
    createExpense: build.mutation({
      query: (createData) => ({
        url: "/expense",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.expense],
    }),
    updateExpense: build.mutation({
      query: ({id, ...data}) => ({
        url: `/expense/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.expense],
    }),
    deleteExpense: build.mutation({
      query: (id) => ({
        url: `/expense/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.expense],
    }),
  }),
});

export const {
    useGetAllExpenseQuery,
    useGetSingleExpenseQuery,
    useCreateExpenseMutation,
    useUpdateExpenseMutation,
    useDeleteExpenseMutation
} = expenseApi;
