"use client";
import { SearchOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import { useEffect, useState } from "react";

import Heading from "../ui/Heading";
import { trips } from "./StaticTableData";
import { getTokenFromKey } from "@/services/auth.service";
import { useGetProfileQuery } from "@/redux/api/authApi";
import { useUpcomingTripQuery } from "@/redux/api/tripApi";

const tripFields = [
    {
      id: 0,
      fields: "Name",
    },
    {
      id: 1,
      fields: "Phone",
    },
    {
      id: 2,
      fields: "Start Date",
    },
    {
      id: 3,
      fields: "Trip Road(from - to)",
    },
    {
      id: 4,
      fields: "Trip Type",
    },
    {
      id: 10,
      fields: "Status",
    },
  ];
const UpcomingTripTable = () => {
  const [current, setCurrent] = useState(1);
  const [userProfile, setUserProfile] = useState<any>({});
  const [allTrip, setAllTrip] = useState([{
    id:'',
    passengerName:'',
    passengerPhone:'',
    startLocation: "",
    startTime:"",
    tripPeriod:"",
    endLocation:"",
    status:''
  }])

  const { data:tripAll , isLoading } = useUpcomingTripQuery({});
  const userInfo = getTokenFromKey();
  const { data: getProfile } = useGetProfileQuery(userInfo?.id);
  useEffect(() => {
    if (getProfile != undefined) {
      setUserProfile(getProfile.data);
      }
  }, [getProfile]);
  const userName = userProfile.name;
  
  useEffect(()=>{
    if(tripAll != undefined && userName){
      const currentdate = new Date();
      const formattedDate = currentdate.toISOString().split('T')[0];
      const compareToday = new Date(formattedDate);
      const tripItem = tripAll.data.map((item: any) => {
        let comparehistory = new Date(item.startTime.substring(0,10));
        if ((compareToday < comparehistory)&&(item.passengerName == userName)) {
          return item;
        }
        return null
      }).filter((item: any) => item !== null);
      setAllTrip(tripItem);
    }
    
  },[tripAll,userProfile])
  


  const confirm = (e: any) => {
    console.log(e);
    message.success(`${e} Deleted Sucessfully`);
  };
 
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  //searching code
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Heading>
        <p>Up-Cumming Trip</p>
      </Heading>
      {/* table start */}
      <div className="overflow-x-auto">
        <div
          className="align-middle inline-block min-w-full shadow 
          overflow-hidden bg-white dark:bg-[#00334E] rounded-tl-2xl rounded-tr-2xl"
        >
          <div className="mx-auto max-w-[55%] md:max-w-[42%] my-2">
            <Input
              size="large"
              placeholder={`Search by Trip Id / Passenger Name of total ${allTrip?.length} Trips`}
              prefix={<SearchOutlined />}
              onChange={(event) => {
                setSearchTerm(event?.target?.value);
              }}
            />
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 ">
              <tr className="dark:bg-[#145374] border-b">
                {(tripFields ?? []).map((vehiclesField) => (
                  <th
                    key={vehiclesField?.id}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {vehiclesField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {(allTrip ?? [])
                ?.filter((value) => {
                  if (searchTerm == "") {
                    return value;
                  } else if (
                    value?.passengerName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return value;
                  }
                })
                ?.map((trip, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      {trip?.passengerName}
                    </td>

                    <td className="px-2 py-3 text-sm leading-5">
                      {trip?.passengerPhone}
                    </td>
                    
                    <td className=" px-2 py-3 text-sm leading-5">
                      {trip.startTime.substring(0,10)}
                    </td>

                    <td className=" px-2 py-3 text-sm leading-5 w-96">
                     {trip?.startLocation} --- {trip?.endLocation}
                    </td>

                    <td className=" px-2 py-3 text-sm leading-5">
                      {trip?.tripPeriod}
                    </td>

                    <td className="px-2 py-3 text-sm leading-5">
                      <span
                        className={`${
                          trip?.status === 'UPCOMMING' ? "bg-orange-300" : "bg-red-300"  
                        } inline-flex px-2 py-1 leading-none dark:text-[#00334E] rounded-lg`}
                      >
                        {trip?.status}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default UpcomingTripTable
