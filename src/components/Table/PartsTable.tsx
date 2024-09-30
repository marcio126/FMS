"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Image, Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { PartsTableFields } from "./StaticTableData";

import AddParts from "@/app/(withlayout)/manager/managePart/AddParts";
import {
  useDeletePartsMutation,
  useGetAllPartsQuery,
} from "@/redux/api/partsApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useState } from "react";
import Heading from "../ui/Heading";
import UpdatePartsForm from "../Forms/UpdatePartsForm";
import ViewPartItem from "../ui/ViewPartItem";
interface IProps {
  id?: string;
  avatar?:string;
  name?:string;
  reg_number?: string;
  description?: string;
  status?:string;
  available?: boolean;
  vendor?: string;
  category?: string;
  manufacturer?: string;
  year?: number;
  model?: string;
  qty_hand?: number;
  unit_cost?: number;
  note?: string;
}

const PartsTable = () => {
  const [deleteParts] = useDeletePartsMutation();

  const confirm = async (e: any) => {
    const res = await deleteParts(e);
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
  const { data: parts } = useGetAllPartsQuery(current);


  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Heading>
        <p>Parts List</p>
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
                placeholder={`Search by Part Name`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox btnLabel="Add Part">
                <AddParts />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {PartsTableFields?.map((PartsTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {PartsTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((parts as any)?.data ?? [])?.filter((V: any) => {
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
                (parts: IProps, index: number) => (
                  <tr
                    key={parts?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      <Image
                        className="rounded-full"
                        width={50}
                        height={50}
                        src={parts?.avatar}
                        alt="..."
                      />
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.name}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.category}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.model}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.status}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.available==true?"Available":"Not Available"}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.unit_cost}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.qty_hand}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {parts?.vendor}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      <div className="flex gap-x-1">
                        <ModalBox
                            title="View Details"
                            modalWidth={300}
                            btnLabel={
                              <span className="item justify-center items-center">
                                <EyeOutlined />
                              </span>
                            }
                          >
                            <ViewPartItem viewID={parts?.id} ItemType="fuel" />
                          </ModalBox>
                        <ModalBox
                          btnLabel={
                            <span className="item justify-center items-center">
                              {" "}
                              <EditOutlined />
                            </span>
                          }
                        >
                          <UpdatePartsForm partsData={parts} />
                        </ModalBox>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(parts?.id)}
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
              total={parts?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default PartsTable;
