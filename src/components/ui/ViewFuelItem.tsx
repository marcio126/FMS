import { useSingleManageFuelQuery } from "@/redux/api/manageFuelApi";
import { formatDateToRegularDate } from "@/utils/formateDate";
import { Timeline } from "antd";

const ViewFuelItem = ({ viewID }: any, ItemType: string) => {
  const  {data:fuel}  =  useSingleManageFuelQuery(viewID);
  
  const purchaseDate = formatDateToRegularDate(fuel?.data?.purchaseDate)
    const registrationDate = formatDateToRegularDate(fuel?.data?.registrationDate)
  const datetime = fuel?.data?.Time.substring(0,10);
  return (
    <>
      
      <br />
      {
        <Timeline
          items={[
            {
              children: `Vehicle Reference: ${fuel?.data?.vehicleVal}`,
            },
            {
              children: `Vendor Name: ${fuel?.data?.vendorName}`,
            }, 
            {
              children: `Fuel Type: ${fuel?.data?.fuelType}`,
            }, 
            {
              children: `Time: ${datetime}`,
            },
            {
              children: `Gallons: ${fuel?.data?.gallons}`,
            },
            {
              children: `Price: ${fuel?.data?.price}`,
            },
            { 
              children: `Meter: ${fuel?.data?.meter}`,
            },
            {
              children: `Province: ${fuel?.data?.province}`,
            },
            {
              children: `Consumption: ${fuel?.data?.consumption}`,
            }
          ]}
        /> 
      }
    </>
  );
};

export default ViewFuelItem;
