import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const IncomeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    IncomeAll: build.query({
      query: (page) => ({
        url: `/income/list?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.trip],
    }), 
    tripDetailsAll: build.query({
      query: () => ({
        url: `/trip/list`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.trip],
    }),
    singleIncome: build.query({
      query: (id) => ({
        url: `/income/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.trip],
    }),
    
    createIncomeCost: build.mutation({
      query: (createData) => ({
        url: "/income/create",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.income],
    }),
    updateSingleIncome: build.mutation({
      query: ({id, ...data}) => ({
        url: `/income/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.trip],
    }),
    deleteIncome: build.mutation({
      query: (id) => ({
        url: `/income/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.trip],
    }),
    upcomingTrip:build.query({
      query:(page)=>({
        url:`/trip/upcomingTrip`,
        method:"GET"
      }),
      providesTags:[tagTypes.trip],
    })
  }),
});

export const {
    useTripDetailsAllQuery,
    useSingleIncomeQuery,
    useUpdateSingleIncomeMutation,
    useDeleteIncomeMutation,
    useUpcomingTripQuery,
  useCreateIncomeCostMutation,
    useIncomeAllQuery
} = IncomeApi;
