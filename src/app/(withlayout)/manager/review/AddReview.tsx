"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import FormSelectField from "@/components/ReusableForms/FormSelectField";

type AddReviewValues = {
  vehicle: string;
  personcharge: string;
  score: number;
  status: string;
  note: string;
};

const statusOptions = [
  {label:"Pending",value:"Pending"},
  {label:"Actived",value:"Actived"},
  {label:"Declined",value:"Declined"},
]


const AddReview = () => {
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
    const { data: driverVehicle } = useDriverVehicleQuery({});
  useEffect(() => {
    if (driverVehicle?.data?.vehicleResult) {
            const options = driverVehicle.data.vehicleResult.map((vehicle: { brand: any;id:any  }) => ({
                label: vehicle.brand,
                value: vehicle.id + "," + vehicle.brand
            }));
            setVehicleOptions(options);
        }
  }, [driverVehicle]);
  const [addReview] = useCreateReviewMutation();
  const onSubmit: SubmitHandler<AddReviewValues> = async (data: any) => {
    const [vehicle_id, vehicle_val] = data?.vehicle.split(',');
    data.vehicle = vehicle_val;
    data.score = parseInt(data.score);
    data.status = "Pending";
    const res = await addReview(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Review Created successful");
    }else{
      message.error("Something went wrong");
    } 
    
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Review</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
        <div className="mb-4">
          <FormSelectField
            name="vehicle"
            size="large"
            placeholder="Select Vehicle"
            options={vehicleOptions}
          />
        </div>
        <div className="mb-4">
          <FormInput name="personcharge" type="text" placeholder="Person in charge" />
        </div>
        <div className="mb-4">
          <FormInput name="score" type="number" placeholder="Score" />
        </div>
        <div className="mb-4">
          <FormInput name="note" type="text" placeholder="Note" />
        </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Review Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddReview;