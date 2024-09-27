"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateVehicleInspectionMutation } from "@/redux/api/vehicleInspectionApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import FormSelectField from "@/components/ReusableForms/FormSelectField";

type AddVehicleInspectionValues = {
  vehicle: string;
  review_by: string;
  reg_number: number;
  failed_items: string;
  duration: string;
};
const AddVehicleInspection = () => {
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
  const [addVehicleInspection] = useCreateVehicleInspectionMutation();
  const onSubmit: SubmitHandler<AddVehicleInspectionValues> = async (data: any) => {
    const [vehicle_id, vehicle_val] = data?.vehicle.split(',');
    data.vehicle = vehicle_val;
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
            <FormSelectField
              name="vehicle"
              size="large"
              placeholder="Select Vehicle"
              options={vehicleOptions}
            />
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