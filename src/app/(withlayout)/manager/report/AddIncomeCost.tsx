"use client";
import { useEffect, useState } from "react";
import { Button,message } from "antd";
import { SubmitHandler } from "react-hook-form"; 

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useCreateIncomeCostMutation } from "@/redux/api/incomeApi";
import { useVehicleAllQuery } from "@/redux/api/vehecleApi";

type CreateIncomeValue = {
  vehicle_maker: string;
  vehicle_model: string;
  tripPeriod: string;
  license_plate: string;
  income_type: string;
  date: Date;
  amount: number;
  mileage: number;
};
const IncomeType = [
  { label: "TRIP", value: "TRIP" },
  { label: "ADDITIONAL_SERVICE", value: "ADDITIONAL_SERVICE" },
  { label: "ADVERTISEMENT", value: "ADVERTISEMENT" },
  { label: "OTHER", value: "OTHER" },
  
]
const AddIncomeCost = () => {

  const [vehicleMakerOption, setVehicleMakerOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleModelOption, setVehicleModelOptions] = useState<{ label: string; value: string }[]>([]);
  const { data: vehicle } = useVehicleAllQuery(1);
  const [createIncomeCost] = useCreateIncomeCostMutation();

  const onSubmit: SubmitHandler<CreateIncomeValue> = async (data: any) => {
    data.date = new Date(data?.date);
    data.amount = parseFloat(data?.amount);
    data.mileage = parseFloat(data?.mileage);
    
    const res = await createIncomeCost(data);
    if((res as any)?.data?.statusCode === 200){
      message.success(`Create Income Sucessfully`);
    }
  };
  useEffect(() => {
    if (vehicle?.data?.data) {
        const options1 = vehicle.data.data.map((vehicle: { brand: any;}) => ({
            label: vehicle.brand,
            value: vehicle.brand
        }));
        setVehicleMakerOptions(options1);
        const options2 = vehicle.data.data.map((vehicle: { model: any;}) => ({
            label: vehicle.model,
            value: vehicle.model
          }));
          setVehicleModelOptions(options2);
        }
  }, [vehicle]);

  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Income Cost</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="mb-4">
            <FormSelectField
              name="vehicle_maker"
              size="large"
              placeholder="Select Vehicle Maker"
              options={vehicleMakerOption}
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="vehicle_model"
              size="large"
              placeholder="Select Vehicle Model"
              options={vehicleModelOption}
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="license_plate"
              type="text"
              placeholder="Enter License Plate"
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="income_type"
              size="large"
              placeholder="Select Income Type"
              options={IncomeType}
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="date"
              type="date"
              placeholder="Enter Date"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="amount"
              type="number"
              placeholder="Enter Cost amount"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="mileage"
              type="number"
              placeholder="Enter Mileage(Km)"
            />
          </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            Add Income Cost
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddIncomeCost;
