"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Image, Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { VendorsTableFields } from "./StaticTableData";

import AddVendors from "@/app/(withlayout)/manager/vendors/AddVendors";
import {
  useDeleteVendorsMutation,
  useGetAllVendorsQuery,
} from "@/redux/api/vendorsApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useState } from "react";
import Heading from "../ui/Heading";
import UpdateVendorsForm from "../Forms/UpdateVendorsForm";
import StarRating from "../ui/StarRating";
import ViewVendorItem from "../ui/ViewVendorItem";
interface IProps {
  id?: string;
  avatar?:string;
  name?:string;
  email?: string;
  phone?: string;
  vendorType?:string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  province?: string;
  note?: string;
  rating?: number;
}

const VendorsTable = () => {
  const [deleteVendors] = useDeleteVendorsMutation();

  const confirm = async (e: any) => {
    const res = await deleteVendors(e);
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
  const { data: vendors } = useGetAllVendorsQuery(current);


  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Heading>
        <p>Vendors List</p>
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
                placeholder={`Search by Vendor Name`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox btnLabel="Add Vendor">
                <AddVendors />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {VendorsTableFields?.map((VendorsTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {VendorsTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((vendors as any)?.data ?? [])?.filter((V: any) => {
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
                (vendors: IProps, index: number) => (
                  <tr
                    key={vendors?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      <Image
                        className="rounded-full"
                        width={50}
                        height={50}
                        src={vendors?.avatar}
                        alt="..."
                      />
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vendors?.name}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vendors?.email}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vendors?.phone}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vendors?.address}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {vendors?.vendorType}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      <StarRating score={vendors?.rating}/>
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
                            <ViewVendorItem viewID={vendors?.id} ItemType="fuel" />
                          </ModalBox>
                        <ModalBox
                          btnLabel={
                            <span className="item justify-center items-center">
                              {" "}
                              <EditOutlined />
                            </span>
                          }
                        >
                          <UpdateVendorsForm vendorsData={vendors} />
                        </ModalBox>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(vendors?.id)}
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
              total={vendors?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default VendorsTable;
