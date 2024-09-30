import { useGetSinglePartsQuery } from "@/redux/api/partsApi";
import { Timeline } from "antd";

const ViewPartItem = ({ viewID }: any, ItemType: string) => {
  const  {data:vendor}  =  useGetSinglePartsQuery(viewID);
  return (
    <>
      
      <br />
      {
        <Timeline
          items={[
            {
              children: `Name: ${vendor?.data?.name}`,
            },
            {
              children: `Reg_Number: ${vendor?.data?.reg_number}`,
            }, 
            {
              children: `Description: ${vendor?.data?.description}`,
            }, 
            {
              children: `Status: ${vendor?.data?.status}`,
            },
            {
              children: `Available: ${vendor?.data?.available}`,
            },
            {
              children: `Vendor: ${vendor?.data?.vendor}`,
            },
            { 
              children: `Category: ${vendor?.data?.category}`,
            },
            {
              children: `Manufacturer: ${vendor?.data?.manufacturer}`,
            },
            {
              children: `Year: ${vendor?.data?.year}`,
            },
            {
              children: `Model: ${vendor?.data?.model}`,
            },
            {
              children: `Hand: ${vendor?.data?.qty_hand}`,
            },
            {
              children: `Cost: ${vendor?.data?.unit_cost}`,
            },
            {
              children: `Note: ${vendor?.data?.note}`,
            }
            
          ]}
        /> 
      }
    </>
  );
};

export default ViewPartItem;
