import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, message } from "antd";
import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import {
    useUpdateSingleIncomeMutation,
} from "@/redux/api/incomeApi";
import { SubmitHandler } from "react-hook-form";
import FormSelectField from "../ReusableForms/FormSelectField";
import FormTextArea from "../ReusableForms/FormTextArea";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import { useVehicleAllQuery } from "@/redux/api/vehecleApi";

type UpdateIncomeValue = {
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
const UpdateIncomeForm = ({ incomeData }: any) => {
  const { id, vehicle_maker, vehicle_model, license_plate, income_type, date, amount, mileage } = incomeData;
  const [updateIncome] = useUpdateSingleIncomeMutation();

    const [vehicleMakerOption, setVehicleMakerOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleModelOption, setVehicleModelOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
    const defaultValues = {
    vehicle_maker: vehicle_maker, 
    vehicle_model: vehicle_model,
    license_plate: license_plate,
    income_type: income_type,
    date:date.substring(0, 10),
    amount: amount,
    mileage: mileage
  };
  const onSubmit: SubmitHandler<UpdateIncomeValue> = async (updateData: any) => {
    updateData.date = new Date(updateData?.date);
    updateData.amount = parseFloat(updateData?.amount);
    updateData.mileage = parseFloat(updateData?.mileage);
    try {
      const res = await updateIncome({ id, ...updateData });
      if ((res as any)?.data?.statusCode === 200) {
      message.success("Income updated successfully");
    }
    } catch (error) {
      message.success("Something Went Wrong");
    }
    };
  const { data: vehicle } = useVehicleAllQuery(1);
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
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update Fuel
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateIncomeForm;
