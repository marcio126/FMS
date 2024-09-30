"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Button,
  Input,
  Pagination,
  PaginationProps,
  Popconfirm,
  message,
  Image
} from "antd";
import { useEffect, useState } from "react";
import UpdateFuelForm from "../Forms/UpdateFuelForm";
import ModalBox from "../ModalBox/ModalBox";
import Heading from "../ui/Heading";
import { manageFuelFields } from "./StaticTableData";
import {useDeleteFuelMutation} from "@/redux/api/manageFuelApi";
import { useGetManageFuelQuery } from "@/redux/api/manageFuelApi";
import AddManageFuel from "@/app/(withlayout)/manager/manageFuel/AddManageFuel";
import ViewFuleItem from "../ui/ViewFuelItem";

const ManageFuelTable = () => {
  const [current, setCurrent] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [fuels, setFuels] = useState({
    data:[],
    meta:{
        limit:0,
        page:0,
        total:0
    }
  });
  const [fuelDelete] = useDeleteFuelMutation();
  const {data:manageFuels} = useGetManageFuelQuery(current)

  useEffect(() => {
    if (manageFuels != undefined) {
      setFuels(manageFuels.data)
    }
  }, [manageFuels]);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  const confirm = async (e: any) => {
    const deleteTrip = await fuelDelete(e);
    message.success(`  Deleted Sucessfully`);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      <Heading>
        <p>Manage Fuel</p>
      </Heading>
      {/* table start */}
      <div className="overflow-x-auto rounded-tl-xl rounded-tr-xl">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white dark:bg-[#00334E]">
          <div className="flex justify-between mx-2 my-2">
            <div className=" max-w-[80%]">
              <Input
                size="large"
                placeholder={`Search by Passenger Name of total ${manageFuels?.length} Trips`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <ModalBox btnLabel="Add Fuel">
              <AddManageFuel />
            </ModalBox>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {(manageFuelFields ?? []).map((V) => (
                  <th
                    key={V?.id}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {V?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {(manageFuels?.data?.data ?? [])
                ?.filter((V: any) => {
                  if (searchTerm == "") {
                    return V;
                  } else if (
                    V?.vehicleVal
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    V?.vendorName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    V?.fuelTyoe
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return V;
                  }
                })
                ?.map((fuel: any, index: number) => (
                  <tr
                    key={fuel?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className=" px-2 py-3 text-sm leading-5">
                      <Image
                        className="rounded-full"
                        width={50}
                        height={50}
                        src={fuel?.photo}
                        alt="vehiclePhoto"
                      />
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">{fuel?.vehicleVal}</td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {fuel?.vendorName}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {fuel?.fuelType}
                    </td>
                    <td className=" px-2 py-3 text-sm leading-5">
                      {fuel?.Time.substring(0,10)}
                    </td>
                    <td className=" px-2 py-3 text-sm leading-5">
                      {fuel?.price}
                    </td>
                    <td className=" px-2 py-3 text-sm leading-5">
                      {fuel?.gallons}
                    </td>
                    <td className=" px-2 py-3 text-sm leading-5">
                      {fuel?.meter}
                    </td>
                    <td className=" px-2 py-3 text-sm leading-5">
                      {fuel?.consumption}{' '}KMPG
                    </td>
                    <td className=" px-2 py-3 text-sm leading-5">
                      {fuel?.province}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      <div className="flex gap-x-1 justify-center">
                        <ModalBox
                            title="View Details"
                            modalWidth={300}
                            btnLabel={
                              <span className="item justify-center items-center">
                                <EyeOutlined />
                              </span>
                            }
                          >
                            <ViewFuleItem viewID={fuel?.id} ItemType="fuel" />
                          </ModalBox>

                          <ModalBox
                            title="Edit Vehicle Data"
                            btnLabel={
                              <span className="item justify-center items-center">
                                <EditOutlined />
                              </span>
                            }
                          >
                            <UpdateFuelForm fuelData={fuel} />
                          </ModalBox>


                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(fuel?.id)}
                          onCancel={() => cancel}
                          okText="Delete"
                          okType="danger"
                          cancelText="No"
                        >
                          <Button danger>
                            <span className="item justify-center items-center">
                              {" "}
                              <DeleteOutlined />{" "}
                            </span>
                          </Button>
                        </Popconfirm>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center py-8">
            <Pagination
              current={current}
              onChange={onChange}
              total={fuels?.meta?.total }
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default ManageFuelTable;

