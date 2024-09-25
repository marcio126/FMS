"use client";
import { useEffect, useState } from "react";

import { 
  Button, 
  Select,
  Popconfirm,
  Pagination, 
  PaginationProps,
  message
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import ModalBox from "../ModalBox/ModalBox";
import Heading from "../ui/Heading";
import { useIncomeAllQuery, useDeleteIncomeMutation } from "@/redux/api/incomeApi";
import AddIncomeCost from "@/app/(withlayout)/manager/report/AddIncomeCost";
import ViewIncomeItem from "../ui/ViewIncomeItem";
import UpdateIncomeForm from "../Forms/UpdateIncomeForm";

const VehicleReg = [
  {
    label: "DHAKA-12345",
    value: "DHAKA-12345",
  },
  {
    label: "CHITTAGONG-67890",
    value: "CHITTAGONG-67890",
  },
  {
    label: "RAJSHAHI-23456",
    value: "RAJSHAHI-23456",
  },
  {
    label: "KHULNA-78901",
    value: "KHULNA-78901",
  },
  {
    label: "SYLHET-34567",
    value: "SYLHET-34567",
  },
  {
    label: "BARISAL-89012",
    value: "BARISAL-89012",
  },
  {
    label: "RANGPUR-45678",
    value: "RANGPUR-45678",
  },
  {
    label: "COMILLA-90123",
    value: "COMILLA-90123",
  },
  {
    label: "NARAYANGANJ-56789",
    value: "NARAYANGANJ-56789",
  },
  {
    label: "GAZIPUR-01234",
    value: "GAZIPUR-01234",
  },
];
const month = [
  { value: "january", label: "january" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "Jun", label: "Jun" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const year = [
  { value: "2015", label: "2015" },
  { value: "2016", label: "2016" },
  { value: "2017", label: "2017" },
  { value: "2018", label: "2018" },
  { value: "2019", label: "2019" },
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const IncomeReportTableFields = [
  {
    id: 0,
    fields: "Vehicle Maker",
  },
  {
    id: 1,
    fields: "Vehicle Model"
  },
  {
    id: 2,
    fields: "License Plate",
  },
  {
    id: 3,
    fields: "Income Type",
  },
  {
    id: 4,
    fields: "Date",
  },
  {
    id: 5,
    fields: "Amount",
  },
  {
    id: 6,
    fields: "Mileage(Km)",
  },
  {
    id: 7,
    fields: "Operation",
  },
];
const IncomeTable = () => {
  const [current, setCurrent] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allData, setAllPost] = useState({data:[],
    meta:{
        limit:0,
        page:0,
        total:0
    }
  })
  const [incomeDelete] = useDeleteIncomeMutation();
  const { data: income } = useIncomeAllQuery(current);

  useEffect(() => {
    if (income != undefined) {
      setAllPost(income?.data);
    }
  }, [income]);
  
  useEffect(() => {
    let total = 0;
    income?.data?.data.map((V: any) => {
      total += parseInt(V?.amount);
    })
    setTotalPrice(total);
  }, [income]);
  
  const onChange: PaginationProps["onChange"] = (page) => {
    setCurrent(page);
  };

  const confirm = async (e: any) => {
    const deleteTrip = await incomeDelete(e);
    message.success(`  Deleted Sucessfully`);
  };
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <>
      <Heading>
        <p>Income Table</p>
      </Heading>
      <div className="overflow-x-auto rounded-tl-xl rounded-tr-xl">
        <div
          className="align-middle inline-block min-w-full shadow 
          overflow-hidden bg-white dark:bg-[#00334E]"
        >
          <div className="flex justify-between p-2">
            <div className="flex gap-x-5">
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Reg. No."
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={VehicleReg}
              />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Month..."
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={month}
              />
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Year..."
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={year}
              />
            </div>

            <ModalBox btnLabel="Add Income Data">
              <AddIncomeCost />
            </ModalBox>
          </div>
          <br />
          <table className="min-w-full ">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {IncomeReportTableFields?.map((V) => (
                  <th
                    key={V?.id}
                    className="px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {V?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {(income?.data?.data??[]).map((V:any, index:number) => (
                <tr
                  key={V?.id}
                  className={`${
                    index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                  }  `}
                >
                  <td className="px-2 py-3 text-sm leading-5">
                    {V?.vehicle_maker}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {V?.vehicle_model}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {V?.license_plate}
                  </td>
                  <td className=" px-2 py-3 text-sm leading-5">{V?.income_type}</td>
                  <td className=" px-2 py-3 text-sm leading-5">{V?.date.substring(0,10)}</td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {V?.amount}
                  </td>
                  <td className="px-2 py-3 text-sm leading-5">
                    {V?.mileage}
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
                            <ViewIncomeItem viewID={V?.id} ItemType="income" />
                          </ModalBox>

                          <ModalBox
                            title="Edit Vehicle Data"
                            btnLabel={
                              <span className="item justify-center items-center">
                                <EditOutlined />
                              </span>
                            }
                          >
                            <UpdateIncomeForm incomeData={V} />
                          </ModalBox>


                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(V?.id)}
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
            <tfoot className="bg-gray-100 font-bold  border-t">
              <tr className="dark:bg-[#145374] ">
                <td colSpan={5} className="px-2 py-3 text-xl">
                  Total
                </td>
                <td className="px-2 py-3 text-xl leading-5">{totalPrice} TK</td>
              </tr>
            </tfoot>
          </table>
          <div className="flex justify-center items-center py-8">
            <Pagination
              current={current}
              onChange={onChange}
              total={allData?.meta?.total }
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default IncomeTable;
