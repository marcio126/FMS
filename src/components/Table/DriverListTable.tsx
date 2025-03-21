"use client";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
  RedoOutlined
} from "@ant-design/icons";
import { Image, Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { DriverListTableFields } from "./StaticTableData";

import AddDriver from "@/app/(withlayout)/manager/driver/AddDriver";
import {
  useDeleteDriverMutation,
  useGetAllDriverQuery,
} from "@/redux/api/driverApi";
import {
  useUserResetPasswordByEmailMutation
} from "@/redux/api/authApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useState } from "react";
import Heading from "../ui/Heading";
import UpdateDriverForm from "../Forms/UpdateDriverForm";
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

const DriverListTable = () => {
  const [deleteDriver] = useDeleteDriverMutation();
  const [resetPassword] = useUserResetPasswordByEmailMutation()
  const confirm = async (e: any) => {
    const res = await deleteDriver(e);
    console.log("🚀 ~ confirm ~ res:", res);
    message.success(`Deleted Sucessfully`);
  };
  const confirmPassword = async (e: any) => {
    const res = await resetPassword(e);
    console.log("🚀 ~ confirm ~ res:", res);
    message.success(`Reset Password Sucessfully`);
  };
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };

  const [current, setCurrent] = useState(1);

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  const { data: driver } = useGetAllDriverQuery(current);


  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Heading>
        <p>Driver</p>
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
                placeholder={`Search by Driver Name`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox btnLabel="Add Driver">
                <AddDriver />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {DriverListTableFields?.map((DriverListTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {DriverListTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((driver as any)?.data ?? [])?.filter((V: any) => {
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
                  <tr
                    key={drivers?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      <Image
                        className="rounded-full"
                        width={50}
                        height={50}
                        src={drivers?.avatar}
                        alt="..."
                      />
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      <p className="text-sm font-bold">{drivers?.name}</p>
                      <p className="text-[8] text-textColor italic">
                        {drivers?.email}
                      </p>
                    </td>

                    <td className="px-2 py-3 text-sm leading-5">
                      {drivers?.phone}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {drivers?.license_no}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {drivers?.experience}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {drivers?.nid}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      <StarRating score={drivers?.score}/>
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {drivers?.license_type}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {drivers?.available=="true"?"Available":"Not Available"}
                    </td>
                    
                    <td className="px-2 py-3 text-sm leading-5">
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

                        <ModalBox
                          btnLabel={
                            <span className="item justify-center items-center">
                              {" "}
                              <EditOutlined />
                            </span>
                          }
                        >
                          <UpdateDriverForm driverData={drivers} />
                        </ModalBox>
                        <Popconfirm
                        title="Reset Password"
                        description="Are you sure to reset password this account?"
                        onConfirm={() => confirmPassword(drivers.email)}
                        onCancel={() => cancel}
                        okText="Yes"
                        cancelText="No"
                        okType="danger"
                      >
                        <Button>
                          <span className="item justify-center items-center">
                            {" "}
                            <RedoOutlined />{" "}
                          </span>
                        </Button>
                      </Popconfirm>
                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(drivers?.id)}
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
              total={driver?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default DriverListTable;
