import { useSingleManageFuelQuery } from "@/redux/api/manageFuelApi";
import { formatDateToRegularDate } from "@/utils/formateDate";
import { Timeline } from "antd";

const ViewFuelItem = ({ viewID }: any, ItemType: string) => {
  const  {data:fuel}  =  useSingleManageFuelQuery(viewID);
  
  const purchaseDate = formatDateToRegularDate(fuel?.data?.purchaseDate)
    const registrationDate = formatDateToRegularDate(fuel?.data?.registrationDate)
  return (
    <>
      
      <br />
      {
        <Timeline
          items={[
            {
              children: `Vehicle Reference: ${fuel?.data?.vehicle}`,
            },
            {
              children: `Vendor Name: ${fuel?.data?.vendorName}`,
            }, 
            {
              children: `Fuel Type: ${fuel?.data?.fuelTyoe}`,
            }, 
            {
              children: `Time: ${fuel?.data?.Time}`,
            },
            {
              children: `Gallons: ${fuel?.data?.gallons}`,
            },
            {
              children: `Price: ${fuel?.data?.price}`,
            },
            { 
              children: `Invoice: ${fuel?.data?.invoice}`,
            },
            {
              children: `Comments: ${fuel?.data?.comments}`,
            }
          ]}
        /> 
      }
    </>
  );
};

export default ViewFuelItem;
