"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateExpenseMutation } from "@/redux/api/expenseApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useGetAllListVendorsQuery } from "@/redux/api/vendorsApi";

import { useGetSingleExpenseQuery } from "@/redux/api/expenseApi";
type AddExpenseValues = {
  vehicle: string;
  expense_type: string;
  vendor: string;
  amount: number;
  note: string;
  date: string;
};

const typeOption = [
  {label:"Insurance",value:"Insurance"},
  {label:"Patente",value:"Patente"},
  {label:"Mechanics",value:"Mechanics"},
  {label:"Car wash",value:"Car wash"},
  {label:"Vignette",value:"Vignette"},
  {label:"Maintenance",value:"Maintenance"},
  {label:"Parking",value:"Parking"},
  {label:"Fuel",value:"Fuel"},
  {label:"Car services",value:"Car services"},
  {label:"Change Oil",value:"Change Oil"},
]
const AddExpense = () => {
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [vendorOptions, setVendorOptions] = useState<{ label: string; value: string }[]>([]);

  const { data: driverVehicle } = useDriverVehicleQuery({});
  const [addExpense] = useCreateExpenseMutation();
  const { data: vendors } = useGetAllListVendorsQuery({});

  useEffect(() => {
      if (driverVehicle?.data?.vehicleResult) {
              const options = driverVehicle.data.vehicleResult.map((vehicle: { brand: any  }) => ({
                  label: vehicle.brand,
                  value: vehicle.brand
              }));
              setVehicleOptions(options);
          }
  }, [driverVehicle]);
  useEffect(() => {
    if (vendors?.data) {
            const options = vendors.data.map((vendor: { name: any }) => ({
                label: vendor.name,
                value: vendor.name
            }));
            setVendorOptions(options);
        }
  }, [vendors]);
  const onSubmit: SubmitHandler<AddExpenseValues> = async (data: any) => {
    data.vehicle = data.vehicle;
    data.vendor = data.vendor;
    data.date = new Date(data.date);
    data.expense_type = data.expense_type;
    data.amount = parseInt(data.amount);
    data.note = data.note;

    const res = await addExpense(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Expense Created successful");
    }else{
      message.error("Something went wrong");
    } 
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Expense</p>
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
            <FormSelectField
              name="vendor"
              size="large"
              placeholder="Vendor Name"
              options={vendorOptions}
            />
          </div>
          <div className="mb-4">
            <FormInput name="date" type="date" placeholder="Date" />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="expense_type"
              size="large"
              placeholder="Expense type"
              options={typeOption}
            />
          </div>
          <div className="mb-4">
            <FormInput name="amount" type="number" placeholder="Cost" />
          </div>
          <div className="mb-4">
            <FormInput name="note" type="text" placeholder="Note" />
          </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Expense Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddExpense;