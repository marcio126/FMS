import { useState } from 'react';
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import { useUpdateVehicleInspectionMutation } from "@/redux/api/vehicleInspectionApi";

type AddVehicleInspectionValues = {
  vehicle: string;
  review_by: string;
  reg_number: number;
  failed_items: string;
  duration: string;
};

const UpdateVehicleInspectionForm = ({ vehicleInspectionData }: any) => { 
  const { vehicle, review_by, reg_number, failed_items, duration, id } = vehicleInspectionData;
  const defaultValues = {
    vehicle: vehicle,
    review_by:review_by,
    reg_number: reg_number,
    failed_items: failed_items,
    duration: duration,
  };
  const [updateVehicleInspection] = useUpdateVehicleInspectionMutation();
  const onSubmit: SubmitHandler<AddVehicleInspectionValues> = async (data: any) => {
    data.id = id;
    data.reg_number = parseInt(data.reg_number);
    try {
      const res = await updateVehicleInspection({id, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Vehicle Inspection updated successfully");
      }
    } catch (error) {
      console.log("Vehicle Inspection update error", error);
    }
  };
  return (
    <>
      <div className="mx-auto overflow-y-scroll p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div className="mb-4">
          <FormInput name="vehicle" type="text" placeholder="Vehicle Name" />
        </div>
        <div className="mb-4">
          <FormInput name="review_by" type="text" placeholder="Review By" />
        </div>
        <div className="mb-4">
          <FormInput name="reg_number" type="number" placeholder="Reg Number" />
        </div>
        <div className="mb-4">
          <FormInput name="failed_items" type="text" placeholder="Fails Items" />
        </div>
        <div className="mb-4">
          <FormInput name="duration" type="text" placeholder="Duration" />
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
