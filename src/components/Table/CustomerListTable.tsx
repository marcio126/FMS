"use client";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  RedoOutlined
} from "@ant-design/icons";
import { Image, Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { CustomerListTableFields } from "./StaticTableData";

import AddCustomer from "@/app/(withlayout)/manager/customer/AddCustomer";
import {
  useDeleteCustomerMutation,
  useGetAllCustomerQuery,
} from "@/redux/api/customerApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useState } from "react";
import Heading from "../ui/Heading";
import UpdateCustomerForm from "../Forms/UpdateCustomerForm";
import StarRating from "../ui/StarRating";
import {
  useUserResetPasswordByEmailMutation
} from "@/redux/api/authApi";
interface IProps {
  id?: string;
  name?:string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
  score?: number;
}

const CustomerListTable = () => {
  const [deleteCustomer] = useDeleteCustomerMutation();
  const [resetPassword] = useUserResetPasswordByEmailMutation()

  const confirm = async (e: any) => {
    const res = await deleteCustomer(e);
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
  const { data: customer } = useGetAllCustomerQuery(current);


  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Heading>
        <p>Customer List</p>
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
                placeholder={`Search by Customer Name`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox modalWidth={500} btnLabel="Add Customer">
                <AddCustomer />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {CustomerListTableFields?.map((CustomerListTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {CustomerListTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((customer as any)?.data ?? [])?.filter((V: any) => {
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
                (customers: IProps, index: number) => (
                  <tr
                    key={customers?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      <Image
                        className="rounded-full"
                        width={50}
                        height={50}
                        src={customers?.avatar}
                        alt="..."
                      />
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {customers?.name}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {customers?.email}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {customers?.phone}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {customers?.address}
                    </td>

                    <td className="px-2 py-3 text-sm leading-5">
                      <StarRating score={customers?.score}/>
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
                          <UpdateCustomerForm customerData={customers} />
                        </ModalBox>
                        <Popconfirm
                        title="Reset Password"
                        description="Are you sure to reset password this account?"
                        onConfirm={() => confirmPassword(customers.email)}
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
                          onConfirm={() => confirm(customers?.id)}
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
              total={customer?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default CustomerListTable;
