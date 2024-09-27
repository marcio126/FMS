"use client";
import AddAccessory from "@/app/(withlayout)/manager/accessories/AddAccessory";
import {
  useDeleteAccessoryMutation,
  useGetAccessoryAllQuery,
} from "@/redux/api/accessoryApi";
import { SearchOutlined,DeleteOutlined,
  EditOutlined,
  EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  Pagination,
  PaginationProps,
  Popconfirm,
  message
} from "antd";
import { useState } from "react";
import UpdateAccessory from "../Forms/UpdateAccessory";
import ViewItemAccessory from "../ui/ViewItemAccessory";
import ModalBox from "../ModalBox/ModalBox";
import Heading from "../ui/Heading";

const accessoriesTableFields = [
  {
    id: 0,
    fields: "Image",
  },
  {
    id: 1,
    fields: "Name",
  },
  {
    id: 2,
    fields: "Category",
  },
  {
    id: 3,
    fields: "Model",
  },
  // {
  //   id: 4,
  //   fields: "Purchase Date",
  // },
  // {
  //   id: 5,
  //   fields: "Expiration Date",
  // },
  {
    id: 6,
    fields: "Status",
  },
  {
    id: 7,
    fields: "Availability",
  },
  {
    id: 8,
    fields: "Unit Cost",
  },
  {
    id: 9,
    fields: "Qty on  hand",
  },
  {
    id: 10,
    fields: "Vendor",
  },
  {
    id: 11,
    fields: "Manufacturer",
  },
  {
    id: 12,
    fields: "Action",
  },
];

const AccessoriesTable = () => {
  const [current, setCurrent] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: accessory,
    isLoading,
    error,
    refetch,
  } = useGetAccessoryAllQuery(current);

  const [deleteAccessory] = useDeleteAccessoryMutation();
  const accessoryData = accessory?.data?.data;

  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const confirm = async (e: any) => {
    const res = await deleteAccessory(e);
    console.log("🚀 ~ confirm ~ res:", res);
    message.success(`Deleted Sucessfully`);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    message.error("Click on No");
  };

  return (
    <>
      <Heading>
        <p>Vehicle Accessories</p>
      </Heading>
      <div className="overflow-x-auto rounded-tl-xl rounded-tr-xl">
        <div
          className="align-middle inline-block min-w-full shadow 
          overflow-hidden bg-white dark:bg-[#00334E]"
        >
          {/* search bar */}
          <div className="flex justify-between mx-2 my-2">
            <div className=" max-w-[80%]">
              <Input
                size="large"
                placeholder={`Search by Trip Id / Passenger Name of total ${accessoryData?.length} Trips`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>

            <ModalBox btnLabel="Add Accessories">
              <AddAccessory />
            </ModalBox>
          </div>
          {/* table start */}
          <table className="min-w-full border-b">
            <thead className="bg-gray-50 rounded-2xl">
              <tr className="dark:bg-[#145374]">
                {accessoriesTableFields?.map((OfficeCostTableField) => (
                  <th
                    key={OfficeCostTableField?.id}
                    className="px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {OfficeCostTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {accessoryData
                ?.filter((V: any) => {
                  if (searchTerm == "") {
                    return V;
                  } else if (
                    V?.accessory_name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    V?.category
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    V?.model
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    V?.vendor
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                    V?.manufacturer
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                  ) {
                    return V;
                  }
                })
                ?.map((accessories: any, index: any) => {
                  const accessoryId = accessories?.id;
                  return (
                    <tr
                      key={accessories?.id}
                      className={`${
                        index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                      }  `}
                    >
                      <td className=" px-2 py-1">
                        <Image
                          className="rounded-lg"
                          width={50}
                          src={accessories?.avatar? accessories?.avatar : "https://i.ibb.co/SRF75vM/avatar.png"}
                          alt="..."
                        />
                      </td>

                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.accessory_name}
                      </td>

                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.category}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.model}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.status}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.availability}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.unit_cost}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.qty_hand}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.vendor}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5">
                        {accessories?.manufacturer}
                      </td>
                      <td className=" px-2 py-3 text-sm leading-5 ">
                        <td className="px-2 py-3 text-sm leading-5">
                      <div className="flex gap-x-1">
                        <ModalBox
                          btnLabel={
                            <span className="item justify-center items-center">
                              <EyeOutlined />
                            </span>
                          }
                        >
                          <ViewItemAccessory viewID={accessories?.id} />
                        </ModalBox>

                        <ModalBox
                          btnLabel={
                            <span className="item justify-center items-center">
                              {" "}
                              <EditOutlined />
                            </span>
                          }
                        >
                          <UpdateAccessory accessoryData={accessories} />
                        </ModalBox>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(accessories?.id)}
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
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <div className="flex justify-center items-center py-2">
            <Pagination
              current={current}
              onChange={onChange}
              total={accessoryData?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default AccessoriesTable;
