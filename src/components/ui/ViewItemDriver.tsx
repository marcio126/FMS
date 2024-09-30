import { useGetSingleDriverQuery } from "@/redux/api/driverApi"; 
import { formatDateToRegularDate } from "@/utils/formateDate";
import { Timeline } from "antd";

const ViewItemDriver = ({ viewID }: any, ItemType: string) => {
  
  const { data: driver } =  useGetSingleDriverQuery(viewID); 
  console.log(driver);
  return (
    <>
      <p className="text-gray-700 sm:col-span-2 underline"> 
      Driver: {driver?.data?.name}
      </p>
      <br />
      {
        <Timeline
          items={[  
            {
              children: `User ID: ${driver?.data?.user_id  }`, 
            },
            {
              children: `Name: ${driver?.data?.name}`, 
            },
            {
              children: `Email: ${driver?.data?.email}`, 
            },
            {
              children: `Phone: ${driver?.data?.phone}`, 
            } , 
            {
              children: `NID: ${driver?.data?.nid}`, 
            } ,
            {
              children: `Address: ${driver?.data?.address}`, 
            }  ,
            {
              children: `License No: ${driver?.data?.license_no}`, 
            },
            {
              children: `Experience: ${driver?.data?.experience}`, 
            },
            {
              children: `Expiry Date: ${driver?.data?.license_expiry_date}`, 
            } ,
            {
              children: `License Type: ${driver?.data?.license_type}`, 
            },
            {
              children: `Score: ${driver?.data?.score}`, 
            },
            {
              children: `Trans distance: ${driver?.data?.trans_distance} Km`, 
            },
            {
              children: `Available: ${driver?.data?.available}`, 
            }
          ]}
        /> 
      }
    </>
  );
};

export default ViewItemDriver;
