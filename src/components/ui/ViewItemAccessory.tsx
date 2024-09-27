import { useGetSingleAccessoryQuery } from "@/redux/api/accessoryApi"; 
import { formatDateToRegularDate } from "@/utils/formateDate";
import { Timeline } from "antd";

const ViewItemAccessory = ({ viewID }: any, ItemType: string) => {
  
  const { data: accessory } =  useGetSingleAccessoryQuery(viewID); 
  const expired = formatDateToRegularDate(accessory?.data?.expire_date);
  const purchase = formatDateToRegularDate(accessory?.data?.purchase_date);
  return (
    <>
      <p className="text-gray-700 sm:col-span-2 to uppercase"> 
      Accessory: {accessory?.data?.accessory_name}
      </p>
      <br />
      {
        <Timeline
          items={[  
            {
              children: `Availability: ${accessory?.data?.availability}`, 
            } ,
            {
              children: `Category: ${accessory?.data?.category}`, 
            }  ,
            {
              children: `Model: ${accessory?.data?.model}`, 
            },
            {
              children: `Vendor: ${accessory?.data?.vendor}`, 
            },
            {
              children: `Manufacturer: ${accessory?.data?.manufacturer}`, 
            } ,
            {
              children: `Qty on hand: ${accessory?.data?.qty_hand}`, 
            },
            {
              children: `Unit cost: ${accessory?.data?.unit_cost}`, 
            },
            {
              children: `Purchase date: ${purchase}`, 
            },
            {
              children: `Expire date: ${expired}`, 
            },
            {
              children: `Availability: ${accessory?.data?.availability}`, 
            },
            {
              children: `Status: ${accessory?.data?.status}`, 
            },
          ]}
        /> 
      }
    </>
  );
};

export default ViewItemAccessory;
