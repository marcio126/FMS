import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";


const vehicleTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllVehicleType: build.query({
      query: (page) => ({
        url: `/vehicletype?page=${page}&limit=${5}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vehicleType],
    }),
    getSingleVehicleType: build.query({
      query: (id) => ({
        url: `/vehicletype/single/${id}`,
        method: "GET", 
      }), 
      providesTags: [tagTypes.vehicleType],
    }),
    createVehicleType: build.mutation({
      query: (createData) => ({
        url: "/vehicletype",
        method: "POST",
        data: createData,
      }),
      invalidatesTags: [tagTypes.vehicleType],
    }),
    updateVehicleType: build.mutation({
      query: ({id, ...data}) => ({
        url: `/vehicletype/update/${id}`,
        method: "PATCH", 
        data: data,
      }),
      invalidatesTags: [tagTypes.vehicleType],
    }),
    deleteVehicleType: build.mutation({
      query: (id) => ({
        url: `/vehicletype/delete/${id}`,
        method: "DELETE",  
      }),
      invalidatesTags: [tagTypes.vehicleType],
    }),
  }),
});

export const {
    useGetAllVehicleTypeQuery,
    useGetSingleVehicleTypeQuery,
    useCreateVehicleTypeMutation,
    useUpdateVehicleTypeMutation,
    useDeleteVehicleTypeMutation
} = vehicleTypeApi;
