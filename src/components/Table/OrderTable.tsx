"use client";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {  Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { OrderListTableFields } from "./StaticTableData";

import AddOrder from "@/app/(withlayout)/manager/order/AddOrder";
import {
  useDeleteOrderMutation,
  useGetAllOrderQuery,
} from "@/redux/api/orderApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useState } from "react";
import Heading from "../ui/Heading";
import UpdateOrderForm from "../Forms/UpdateOrderForm";

interface IProps {
  id?: string;
  vendor?: string;
  vehicle?: string;
  issuedby?: string;
  requiredby?: string;
  cost?: number;
  status?: string;
  issuedto?: string;
  assignedto?: string;
  note?: string;
}

const OrderTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [current, setCurrent] = useState(1);
  const [deleteOrder] = useDeleteOrderMutation();
  const { data: order } = useGetAllOrderQuery(current);

  const confirm = async (e: any) => {
    const res = await deleteOrder(e);
    console.log("🚀 ~ confirm ~ res:", res);
    message.success(`Deleted Sucessfully`);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  return (
    <>
      <Heading>
        <p>Order List</p>
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
                placeholder={`Search by Order`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox btnLabel="Add Order">
                <AddOrder />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {OrderListTableFields?.map((OrderListTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {OrderListTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((order as any)?.data ?? [])?.filter((V: any) => {
                if (searchTerm == "") {
                  return V;
                } else if (
                  V?.vehicle
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  V?.vendor
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||
                  V?.issuedto
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())||
                  V?.assignedto
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return V;
                }
              })?.map(
                (order: IProps, index: number) => (
                  <tr
                    key={order?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.vendor}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.vehicle}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.issuedby?.substring(0,10)}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.requiredby?.substring(0,10)}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.cost}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.status}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.issuedto}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.assignedto}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {order?.note}
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
                          <UpdateOrderForm orderData={order} />
                        </ModalBox>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(order?.id)}
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
              total={order?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default OrderTable;
