import { useSingleIncomeQuery } from "@/redux/api/incomeApi";
import { formatDateToRegularDate } from "@/utils/formateDate";
import { Timeline } from "antd";

const ViewIncomeItem = ({ viewID }: any, ItemType: string) => {
  const  {data:income}  =  useSingleIncomeQuery(viewID);
  const date = formatDateToRegularDate(income?.data?.date)
  return (
    <>
      
      <br />
      {
        <Timeline
          items={[
            {
              children: `Vehicle Maker: ${income?.data?.vehicle_maker}`,
            },
            {
              children: `Vehicle Model: ${income?.data?.vehicle_model}`,
            }, 
            {
              children: `License Plate: ${income?.data?.license_plate}`,
            }, 
            {
              children: `Income_type: ${income?.data?.income_type}`,
            },
            {
              children: `Date: ${date}`,
            },
            {
              children: `Amount: ${income?.data?.amount}`,
            },
            { 
              children: `Mileage: ${income?.data?.mileage}`,
            }
          ]}
        /> 
      }
    </>
  );
};

export default ViewIncomeItem;
