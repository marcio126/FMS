import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const manageFuelApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getManageFuel: build.query({
            query: (page) => ({
                url: `/manage-fuel/list?page=${page}&limit=${5}`,
                method: "GET",
            }),
            providesTags: [tagTypes.manageFuel],
        }),
        createFuel: build.mutation({
            query: (createData) => ({
                url: "/manage-fuel/create",
                method: "POST",
                data: createData,
            }),
            invalidatesTags: [tagTypes.manageFuel],
        }),
        singleManageFuel: build.query({
            query: (id) => ({
                url: `/manage-fuel/single/${id}`,
                method: "GET", 
            }), 
            providesTags: [tagTypes.manageFuel],
        }),
        updateSingleFuel: build.mutation({
            query: ({id, ...data}) => ({
                url: `/manage-fuel/update/${id}`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: [tagTypes.manageFuel],
        }),
        deleteFuel: build.mutation({
            query: (id) => ({
                url: `/manage-fuel/delete/${id}`,
                method: "DELETE",  
            }),
            invalidatesTags: [tagTypes.manageFuel],
        }),
        createRequest: build.mutation({
            query: (createData) => ({
                url: "/manageRequest",
                method: "POST",
                data: createData,
            }),
            invalidatesTags: [tagTypes.manageFuel],
        }),
        updateRequest: build.mutation({
          query: (data) => ({
            url: "/inventoryRequest/updateRequest",
            method: "PATCH", 
            data: data,
          }),
          invalidatesTags: [tagTypes.manageFuel],
        }),
        
    }),
});

export const {
    useCreateFuelMutation, useCreateRequestMutation, useGetManageFuelQuery,useUpdateRequestMutation,useSingleManageFuelQuery,
  useUpdateSingleFuelMutation,useDeleteFuelMutation
} = manageFuelApi;
