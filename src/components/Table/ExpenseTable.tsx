"use client";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {  Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { ExpenseListTableFields } from "./StaticTableData";

import AddExpense from "@/app/(withlayout)/driver/expense/AddExpense";
import {
  useDeleteExpenseMutation,
  useGetAllExpenseQuery,
} from "@/redux/api/expenseApi";
import { Button, Pagination, Popconfirm, message } from "antd";
import { useState } from "react";
import Heading from "../ui/Heading";
import UpdateExpenseForm from "../Forms/UpdateExpenseForm"
interface IProps {
  id?: string;
  vendor?: string;
  vehicle?: string;
  expense_type?: string;
  amount?: number;
  note?: string;
  date?: string;
}

const ExpenseTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [current, setCurrent] = useState(1);
  const [deleteOrder] = useDeleteExpenseMutation();
  const { data: expense } = useGetAllExpenseQuery(current);
  const confirm = async (e: any) => {
    const res = await deleteOrder(e);
    console.log("🚀 ~ confirm ~ res:", res);
    message.success(`Deleted Sucessfully`);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    message.error("Click on No");
  };

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };
  

  return (
    <>
      <Heading>
        <p>Expense List</p>
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
                placeholder={`Search by Expense`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox btnLabel="Add Expense">
                <AddExpense />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {ExpenseListTableFields?.map((ExpenseListTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {ExpenseListTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((expense as any)?.data?.data ?? [])?.filter((V: any) => {
                if (searchTerm == "") {
                  return V;
                } else if (
                  V?.vehicle
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  V?.vendor
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return V;
                }
              })?.map(
                (expense: IProps, index: number) => (
                  <tr
                    key={expense?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      {expense?.vehicle}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {expense?.expense_type}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {expense?.vendor}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {expense?.amount}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {expense?.note}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {expense?.date?.substring(0,10)}
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
                          <UpdateExpenseForm expenseData={expense} />
                        </ModalBox>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(expense?.id)}
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
              total={expense?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default ExpenseTable;
