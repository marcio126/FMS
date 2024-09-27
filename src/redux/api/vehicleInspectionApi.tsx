import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const vehicleInspectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVehicleInspection: build.query({
      query: (page) => ({
        url: `/vehicleinspection?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vehicleInspection],
    }),
    getSingleVehicleInspection: build.query({
      query: (id) => ({
        url: `/vehicleinspection/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vehicleInspection],
    }),
    createVehicleInspection: build.mutation({
      query: (createData) => ({
        url: "/vehicleinspection",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.vehicleInspection],
    }),
    updateVehicleInspection: build.mutation({
      query: ({id, ...data}) => ({
        url: `/vehicleinspection/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.vehicleInspection],
    }),
    deleteVehicleInspection: build.mutation({
      query: (id) => ({
        url: `/vehicleinspection/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.vehicleInspection],
    }),
  }),
});

export const {
    useGetAllVehicleInspectionQuery,
    useGetSingleVehicleInspectionQuery,
    useCreateVehicleInspectionMutation,
    useUpdateVehicleInspectionMutation,
    useDeleteVehicleInspectionMutation
} = vehicleInspectionApi;
