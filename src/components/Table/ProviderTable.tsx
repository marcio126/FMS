"use client";
import {
  useVehicleAllListQuery,
} from "@/redux/api/vehecleApi";
import {
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { PaginationProps } from "antd";
import {Image, Button, Input, Pagination, Popconfirm, message } from "antd";
import React, { useEffect, useState } from "react";
import ModalBox from "../ModalBox/ModalBox";
import Heading from "../ui/Heading";
import ViewItem from "../ui/ViewItem";

interface IProps {
  id: string;
  vehicleName: string;
  vin_sn: string;
  brand: string;
  model: string;
  vehicleType: string;
  fuelType: string;
  available: string;
  avatar?: string;
}

const ProviderTable = (e: any) => {
  const { data: vehicles } = useVehicleAllListQuery({});
  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  const [allData, setAllData] = useState([]);
  useEffect(() => {
    const item = vehicles?.data?.data.filter((it: any) => it.available == "true");
    setAllData(item);
  },[vehicles])
  return (
    <>
      <Heading>
        <p>Available Vehicle</p>
      </Heading>
      <div className="overflow-x-auto rounded-tl-xl rounded-tr-xl py-4">
        <div
          className="align-middle inline-block min-w-full shadow 
          overflow-hidden bg-white dark:bg-[#00334E]"
        >
          <div className="flex justify-between mx-2 my-2">
            <div className=" max-w-[80%]">
              <Input
                size="large"
                placeholder={`Search by Vehicle Name`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
          </div>

          {/* table start */}
          <div className="min-w-full">
            <div className="grid grid-cols-4 dark:text-[#E8E8E8]">
              {((allData as any) ?? [])
                ?.filter((V: any) => {
                  if (searchTerm == "") {
                    return V;
                  } else if (
                    V?.vehicleName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    V?.vin_sn.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return V;
                  }
                })
                ?.map((vehicle: IProps, index: number) => (
                  <div key={vehicle?.id} className="px-2 py-3 text-sm leading-5 gap-1 min-w-36 max-w-[145px] w-[100%] flex flex-col items-center mr-[50px] ml-[50px]">
                    <Image
                        className="rounded-md self-center	"
                        width={70}
                        height={70}
                        src={vehicle?.avatar}
                        alt="..."
                      />
                      <div className="flex flex-col items-center gap-3 justify-center">
                        <p>{vehicle?.vehicleName}</p>
                        <div className="flex gap-x-1 ">
                          <ModalBox
                            title="View Details"
                            modalWidth={300}
                            btnLabel={
                              <span className="item justify-center items-center">
                                <EyeOutlined />
                              </span>
                            }
                          >
                            <ViewItem viewID={vehicle?.id} ItemType="vehicle" />
                          </ModalBox>
                        </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default ProviderTable;
