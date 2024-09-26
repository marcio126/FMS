"use client";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {  Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { VehicleInspectionListTableFields } from "./StaticTableData";

import AddVehicleInspection from "@/app/(withlayout)/manager/vehicleInspection/AddVehicleInspection";
import {
  useDeleteVehicleInspectionMutation,
  useGetAllVehicleInspectionQuery,
} from "@/redux/api/vehicleInspectionApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useState } from "react";
import Heading from "../ui/Heading";
import UpdateVehicleInspectionForm from "../Forms/UpdateVehicleInspectionForm";

interface IProps {
  id?: string;
  vehicle?: string;
  review_by?: string;
  reg_number?: number;
  failed_items?: string;
  duration?: string;
}

const VehicleInspectionTable = () => {
  const [deleteVehicleInspection] = useDeleteVehicleInspectionMutation();

  const confirm = async (e: any) => {
    const res = await deleteVehicleInspection(e);
    console.log("🚀 ~ confirm ~ res:", res);
    message.success(`Deleted Sucessfully`);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  const { data: vehicleinspection } = useGetAllVehicleInspectionQuery(current);


  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Heading>
        <p>Vehicle Inspection List</p>
      </Heading>
      {/* table start */}
      <div className="overflow-x-auto rounded-tl-xl rounded-tr-x">
        <div
          className="align-middle inline-block min-w-full shadow 
          overflow-hidden bg-white dark:bg-[#00334E]"
        >
          <div className="flex justify-between mx-2 my-2">
            <div className=" max-w-[80%]">
              <Input
                size="large"
                placeholder={`Search by Vehicle Inspection`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox btnLabel="Add Vehicle Inspection">
                <AddVehicleInspection />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {VehicleInspectionListTableFields?.map((VehicleInspectionListTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {VehicleInspectionListTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((vehicleinspection as any)?.data ?? [])?.filter((V: any) => {
                if (searchTerm == "") {
                  return V;
                } else if (
                  V?.vehicle
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  V?.review_by
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return V;
                }
              })?.map(
                (vehicleinspections: IProps, index: number) => (
                  <tr
                    key={vehicleinspections?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      {vehicleinspections?.vehicle}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vehicleinspections?.review_by}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vehicleinspections?.reg_number}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vehicleinspections?.failed_items}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vehicleinspections?.duration}
                    </td>
                    
                    <td className="px-2 py-3 text-sm leading-5">
                      <div className="flex gap-x-1">
                        <ModalBox
                          btnLabel={
                            <span className="item justify-center items-center">
                              {" "}
                              <EditOutlined />
                            </span>
                          }
                        >
                          <UpdateVehicleInspectionForm vehicleInspectionData={vehicleinspections} />
                        </ModalBox>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(vehicleinspections?.id)}
                          onCancel={() => cancel}
                          
                          cancelText="No"
                          okText="Delete"
                          okType="danger"
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
                )
              )}
            </tbody>
          </table>

          <div className="flex justify-center items-center py-8">
            <Pagination
              current={current}
              onChange={onChange}
              total={vehicleinspection?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default VehicleInspectionTable;
