import { useEffect, useState } from 'react';
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import { useUpdateReviewMutation } from "@/redux/api/reviewApi";
import FormSelectField from '../ReusableForms/FormSelectField';

type AddReviewValues = {
  giver: string;
  receiver: string;
  score: number;
  badge: string;
  note: string;
};
const badgeOptions = [
  { label: "True", value: "true" },
  { label: "False", value: "false"}
]
const UpdateVehicleInspectionForm = ({ reviewData }: any) => { 
  const { giver, receiver, score, badge, note, id } = reviewData;
  const defaultValues = {
    giver: giver,
    receiver:receiver,
    score: score,
    badge: badge,
    note: note,
  };

  const [updateReview] = useUpdateReviewMutation();
  const onSubmit: SubmitHandler<AddReviewValues> = async (data: any) => {
    data.id = id;
    data.receiver = data.receiver;
    data.giver = data.giver;
    data.score = parseInt(data.score);
    data.badge = data.badge;
    try {
      const res = await updateReview({id, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Review updated successfully");
      }
    } catch (error) {
      console.log("Review update error", error);
    }
  };
  return (
    <>
      <div className="mx-auto overflow-y-scroll p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div className="mb-4">
            <FormInput name="giver" type="text" placeholder="Giver" />
          </div>
          <div className="mb-4">
            <FormInput name="receiver" type="text" placeholder="Receiver" />
          </div>
          <div className="mb-4">
            <FormSelectField
                name="badge"
                size="large"
                placeholder="Choose Badge"
                options={badgeOptions}
              />
          </div>
          <div className="mb-4">
            <FormInput name="score" type="number" placeholder="Score" />
          </div>
          <div className="mb-4">
            <FormInput name="note" type="text" placeholder="Note" />
          </div>
          <Button
            htmlType="submit"
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateVehicleInspectionForm;
