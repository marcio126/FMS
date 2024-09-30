import { useEffect, useState } from 'react';
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import { useUpdateExpenseMutation } from "@/redux/api/expenseApi";
import { useDriverVehicleQuery } from '@/redux/api/driverApi';
import FormSelectField from '../ReusableForms/FormSelectField';
import { useGetAllListVendorsQuery } from '@/redux/api/vendorsApi';

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
const statusOption = [
  { label: "pending", value: "pending" },
  { label: "processing", value: "processing" },
  { label: "completed", value: "completed" },
  { label: "hold", value: "hold" }
]
const UpdateExpenseForm = ({ expenseData }: any) => { 
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [vendorOptions, setVendorOptions] = useState<{ label: string; value: string }[]>([]);
  const { data: vendors } = useGetAllListVendorsQuery({});
  const [updateExpense] = useUpdateExpenseMutation();
  const { data: driverVehicle } = useDriverVehicleQuery({});
  const { vendor,vehicle,expense_type, amount, date ,note, id } = expenseData;
  
  const defaultValues = {
    vehicle: vehicle,
    vendor:vendor,
    expense_type:expense_type,
    date: date.substring(0,10),
    amount: amount,
    note: note
  };

  useEffect(() => {
    if (driverVehicle?.data?.vehicleResult) {
            const options = driverVehicle.data.vehicleResult.map((vehicle: { brand: any;id:any  }) => ({
                label: vehicle.brand,
                value: vehicle.id + "," + vehicle.brand
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
    data.id = id;
    data.vehicle = data?.vehicle;
    data.vendor = data.vendor;
    data.date = new Date(data.date);
    data.expense_type = data.expense_type;
    data.amount = parseInt(data.amount);
    data.note = data.note;
    try {
      const res = await updateExpense({id, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Expense updated successfully");
      }
    } catch (error) {
      console.log("Expense update error", error);
    }
  };
  return (
    <>
      <div className="mx-auto overflow-y-scroll p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateExpenseForm;
