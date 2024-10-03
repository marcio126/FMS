"use client";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {  Input, PaginationProps } from "antd";
import ModalBox from "../ModalBox/ModalBox";

import { ReviewListTableFields } from "./StaticTableData";

import AddReview from "@/app/(withlayout)/manager/review/AddReview";
import {
  useDeleteReviewMutation,
  useGetAllReviewQuery,
} from "@/redux/api/reviewApi";
import { getTokenFromKey } from "@/services/auth.service";
import { useGetProfileQuery } from "@/redux/api/authApi";

import { Button, Pagination, Popconfirm, message } from "antd";
import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import UpdateReviewForm from "../Forms/UpdateReviewForm";
import StarRating from './../ui/StarRating';

interface IProps {
  id?: string;
  giver?: string;
  receiver?: string;
  badge?: string;
  score?: number;
  note?: string;
}

const ReviewTable = () => {
  const [deleteReview] = useDeleteReviewMutation();
 const [userProfile, setUserProfile] = useState<any>({});
  const userInfo = getTokenFromKey();
  const { data: getProfile } = useGetProfileQuery(userInfo?.id);
  useEffect(() => {
    if (getProfile != undefined) {
      setUserProfile(getProfile.data);
      }
  }, [getProfile]);
  const role = userProfile.role;
  const confirm = async (e: any) => {
    const res = await deleteReview(e);
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
  const { data: review } = useGetAllReviewQuery(current);


  //searching code
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <Heading>
        <p>Review List</p>
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
                placeholder={`Search by vehicle and person in charge`}
                prefix={<SearchOutlined />}
                onChange={(event) => {
                  setSearchTerm(event?.target?.value);
                }}
              />
            </div>
            <div className="flex justify-start">
              <ModalBox btnLabel="Add Review">
                <AddReview />
              </ModalBox>
            </div>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-50 rounded-2xl border-b">
              <tr className="dark:bg-[#145374]">
                {ReviewListTableFields?.map((ReviewListTableField,index) => (
                  <th
                    key={index}
                    className=" px-2 py-3 text-left text-black dark:text-[#E8E8E8]"
                  >
                    {ReviewListTableField?.fields}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="dark:text-[#E8E8E8]">
              {((review as any)?.data ?? [])?.filter((V: any) => {
                if (searchTerm == "") {
                  return V;
                } else if (
                  V?.vehicle
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  V?.personcharge
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return V;
                }
              })?.map(
                (reviews: IProps, index: number) => (
                  <tr
                    key={reviews?.id}
                    className={`${
                      index % 2 === 0 ? "" : "bg-gray-50 dark:bg-[#145374]"
                    }  `}
                  >
                    <td className="px-2 py-3 text-sm leading-5">
                      {reviews?.giver}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {reviews?.receiver}
                    </td>
                    <td className="px-2 py-3 text-xl leading-5">
                      {reviews?.badge=="true"?"👍":""}
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      <StarRating score={reviews?.score}/>
                    </td>
                    <td className="px-2 py-3 text-sm leading-5">
                      {reviews?.note}
                    </td>
                      <td className="px-2 py-3 text-sm leading-5">
                    <div className="flex gap-x-1">
                    {(role == "MANAGER") ? (<>
                        <ModalBox
                          btnLabel={
                            <span className="item justify-center items-center">
                              {" "}
                              <EditOutlined />
                            </span>
                          }
                        >
                          <UpdateReviewForm reviewData={reviews} />
                        </ModalBox>

                        <Popconfirm
                          title="Delete the task"
                          description="Are you sure to delete this task?"
                          onConfirm={() => confirm(reviews?.id)}
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
                        </Popconfirm></>
                    ):"Not Available"}
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
              total={review?.data?.meta?.total | 30}
            />
          </div>
        </div>
        {/* table end */}
      </div>
    </>
  );
};

export default ReviewTable;
