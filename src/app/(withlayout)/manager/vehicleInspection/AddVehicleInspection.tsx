"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateVehicleInspectionMutation } from "@/redux/api/vehicleInspectionApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";

type AddVehicleInspectionValues = {
  vehicle: string;
  review_by: string;
  reg_number: number;
  failed_items: string;
  duration: string;
};
const AddVehicleInspection = () => {
  
  const [addVehicleInspection] = useCreateVehicleInspectionMutation();
  const onSubmit: SubmitHandler<AddVehicleInspectionValues> = async (data: any) => {
    data.reg_number = parseInt(data.reg_number);
    const res = await addVehicleInspection(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Vehicle Inspection Created successful");
    }else{
      message.error("Something went wrong");
    } 
    
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Vehicle Inspection</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
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
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Vehicle Inspection Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddVehicleInspection;