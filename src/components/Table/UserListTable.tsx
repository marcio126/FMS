"use client";
import {
  DeleteOutlined,
  SearchOutlined
} from "@ant-design/icons";
import { Button,Image,PaginationProps,Pagination,Input,message,Popconfirm } from "antd";
import ModalBox from "../ModalBox/ModalBox";
import { UserListTableFields } from "./StaticTableData";
import {
  useGetAllQuery,
  useUserDeleteMutation
} from "@/redux/api/authApi";
import { useState } from "react";

const UserListTable = () => {
  const [current, setCurrent] = useState(1);
  const [deleteUser] = useUserDeleteMutation();

  const onChange: PaginationProps["onChange"] = (page) => {
      setCurrent(page);
    };
  const { data: allUser } = useGetAllQuery(current);
  console.log(allUser);
  const confirm = async (e: any) => {
    const res = await deleteUser(e);
    console.log("🚀 ~ confirm ~ res:", res);
    message.success(`Deleted Sucessfully`);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* table start */}
      <div className="overflow-x-auto rounded-lg">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white   px-8 pt-3 rounded-bl-lg rounded-br-lg py-10">
          <div className="pb-3 flex justify-between">
            <div className=" max-w-[80%]">
                <Input
                  type="text"
                  size="large"
                  prefix={<SearchOutlined />}
                  placeholder={`Search Through Manager`}
                   onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
                />
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl">
              <tr className="">
                {UserListTableFields?.map((DriverListTableField) => (
                  <th
                    key={DriverListTableField?.id}
                    className=" px-2 py-3 text-left text-black"
                  >
                    {DriverListTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="">
              {((allUser as any)?.data.data ?? [])?.filter((V: any) => {
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
                (user: any, index: any) => (
                <tr
                  key={user?.id}
                  className={`${index % 2 === 0 ? "" : "bg-gray-50"}  `}
                >
                  <td className="px-2">
                    <Image
                      className="rounded-full"
                      width={30}
                      src={user?.avatar}
                      alt="..."
                    />
                  </td>
                   <td className="px-2 py-3 text-sm leading-5">
                    {user?.name}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {user?.email}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {user?.phone}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {user?.address}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {user?.location}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirm(user?.id)}
                        onCancel={() => cancel}
                        okText="Yes"
                        cancelText="No"
                        okType="danger"
                      >
                        <Button danger>
                          <span className="item justify-center items-center">
                            {" "}
                            <DeleteOutlined />{" "}
                          </span>
                        </Button>
                      </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center my-4  mx-auto">
            <Pagination
              current={current}
              onChange={onChange}
              total={allUser?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default UserListTable;
