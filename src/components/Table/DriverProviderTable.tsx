"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Image, Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";
import {
  useGetDriverListQuery,
} from "@/redux/api/driverApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import ViewItemDriver from "../ui/ViewItemDriver";
import StarRating from "../ui/StarRating";

interface IProps {
  address?: string;
  avatar?: string;
  createAt?: string;
  email?: string;
  experience?: number;
  id?: string;
  license_no?: string;
  name?: string;
  nid?: string;
  password?: string;
  phone?: string;
  role?: string;
  user_id?: string;
  score?: number;
  license_type?: string;
  license_expiry_date?: Date;
  trans_distance?: number;
  available?:string
}

const DriverProviderTable = () => {
  const [alldriver, setAllDriver] = useState([{
    id:'',
    address:'',
    available:'',
    avatar: "",
    email:"",
    experience:"",
    license_expiry_date:"",
    license_no:'',
    license_type:'',
    name:'',
    nid:'',
    phone: '',
    score:'',
    trans_distance:'',    
  }])
  const { data: driver } = useGetDriverListQuery({});
  useEffect(()=>{
    if(driver != undefined){
      const item = driver.data.map((item: any) => {
        if (item.available=="true") {
          return item;
        }
        return null
      }).filter((item: any) => item !== null);
      setAllDriver(item);
    }
    
  },[driver])
  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Heading>
        <p>Available Driver</p>
      </Heading>
      {/* table start */}
      <div className="overflow-x-auto rounded-tl-xl rounded-tr-x py-4">
        <div
          className="align-middle inline-block min-w-full shadow 
          overflow-hidden bg-white dark:bg-[#00334E]"
        >
          <div className="flex justify-between mx-2 my-2">
            <div className=" max-w-[80%]">
              <Input
                size="large"
                placeholder={`Search by Driver Name`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
          </div>

          <div className="min-w-full">
            <div className="dark:text-[#E8E8E8] grid grid-cols-4">
              {((alldriver as any) ?? [])?.filter((V: any) => {
                if (searchTerm == "") {
                  return V;
                } else if (
                  V?.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return V;
                }
              })?.map(
                (drivers: IProps, index: number) => (
                  <div
                    key={drivers?.id}
                    className="inline-flex flex-col items-center py-5 mr-[50px] ml-[50px]"
                  >
                    <div className="px-2 py-3 text-sm leading-5 flex gap-3 items-center">
                      <Image
                        className="rounded-md"
                        width={70}
                        height={70}
                        src={drivers?.avatar}
                        alt="..."
                      />

                      <div className="flex flex-col items-center gap-3 justify-center">
                        <p className="text-sm font-bold">{drivers?.name}</p>
                        <div className="flex gap-x-1">
                          <ModalBox
                            btnLabel={
                              <span className="item justify-center items-center">
                                <EyeOutlined />
                              </span>
                            }
                          >
                            <ViewItemDriver viewID={drivers?.id} />
                          </ModalBox>      
                        </div>
                      </div>
                    </div>
                      <StarRating score={drivers?.score}/>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default DriverProviderTable;
