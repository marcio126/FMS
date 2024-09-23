import { useGetSingleVehicleQuery } from "@/redux/api/vehecleApi";
import { formatDateToRegularDate } from "@/utils/formateDate";
import { Timeline } from "antd";

const ViewItem = ({ viewID }: any, ItemType: string) => {
  const { data: vehicle } =  useGetSingleVehicleQuery(viewID);
  
  const purchaseDate = formatDateToRegularDate(vehicle?.data?.purchaseDate)
  const registrationDate = formatDateToRegularDate(vehicle?.data?.registrationDate)
  return (
    <>
      <p className="text-gray-700 sm:col-span-2 underline">
      Vehicle Name: {vehicle?.data?.vehicleName}
      </p>
      <br />
      {
        <Timeline
          items={[
            {
              children: `VIN/SN: ${vehicle?.data?.vin_sn}`,
            },            
            {
              children: `Brand: ${vehicle?.data?.brand}`,
            },
            {
              children: `Model: ${vehicle?.data?.model}`,
            },
            {
              children: `VehicleType: ${vehicle?.data?.vehicleType}`,
            },            
            {
              children: `FuelType: ${vehicle?.data?.fuelType}`,
            }, 
            {
              children: `Mileage: ${vehicle?.data?.mileage}`,
            },

            {
              children: `Price: ${vehicle?.data?.price}`,
            },
            {
              children: `Tax: ${vehicle?.data?.tax}`,
            },             
            {
              children: `RegistrationDate: ${registrationDate}`,
            },
          ]}
        /> 
      }
    </>
  );
};

export default ViewItem;
