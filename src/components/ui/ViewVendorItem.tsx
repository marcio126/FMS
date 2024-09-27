import { useGetSingleVendorsQuery } from "@/redux/api/vendorsApi";
import { formatDateToRegularDate } from "@/utils/formateDate";
import { Timeline } from "antd";

const ViewVendorItem = ({ viewID }: any, ItemType: string) => {
  const  {data:vendor}  =  useGetSingleVendorsQuery(viewID);
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
              children: `Email: ${vendor?.data?.email}`,
            }, 
            {
              children: `Phone: ${vendor?.data?.phone}`,
            }, 
            {
              children: `Address: ${vendor?.data?.address}`,
            },
            {
              children: `City: ${vendor?.data?.city}`,
            },
            {
              children: `Country: ${vendor?.data?.country}`,
            },
            { 
              children: `PostalCode: ${vendor?.data?.postalCode}`,
            },
            {
              children: `VendorType: ${vendor?.data?.vendorType}`,
            },
            {
              children: `Website: ${vendor?.data?.website}`,
            },
            {
              children: `Province: ${vendor?.data?.province}`,
            },
            {
              children: `Note: ${vendor?.data?.note}`,
            },
            {
              children: `Rating: ${vendor?.data?.rating}`,
            }
          ]}
        /> 
      }
    </>
  );
};

export default ViewVendorItem;
