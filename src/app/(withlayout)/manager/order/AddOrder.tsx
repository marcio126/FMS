"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateOrderMutation } from "@/redux/api/orderApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useGetAllListVendorsQuery } from "@/redux/api/vendorsApi";

type AddOrderValues = {
  vendor: string;
  vehicle: string;
  issuedby: Date;
  requiredby: Date;
  cost: number;
  status: string;
  issuedto: string;
  assignedto: string;
  note: string;
};

const AddOrder = () => {
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [vendorOptions, setVendorOptions] = useState<{ label: string; value: string }[]>([]);

  const { data: driverVehicle } = useDriverVehicleQuery({});
  const [addOrder] = useCreateOrderMutation();
  const { data: vendors } = useGetAllListVendorsQuery({});

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
  const onSubmit: SubmitHandler<AddOrderValues> = async (data: any) => {
    const [vehicle_id, vehicle_val] = data?.vehicle.split(',');
    data.vehicle = vehicle_val;
    data.issuedby = new Date(data.issuedby);
    data.requiredby = new Date(data.requiredby);
    data.cost = Number(data.cost);
    data.status = "pending";

    const res = await addOrder(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Order Created successful");
    }else{
      message.error("Something went wrong");
    } 
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Order</p>
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
            <FormInput name="issuedby" type="date" placeholder="Issued by" />
          </div>
          <div className="mb-4">
            <FormInput name="requiredby" type="date" placeholder="Required by" />
          </div>
          <div className="mb-4">
            <FormInput name="cost" type="number" placeholder="cost" />
          </div>
          <div className="mb-4">
            <FormInput name="issuedto" type="text" placeholder="Issued to" />
          </div>
          <div className="mb-4">
            <FormInput name="assignedto" type="text" placeholder="Assigned to" />
          </div>
          <div className="mb-4">
            <FormInput name="note" type="text" placeholder="Note" />
          </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Order Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddOrder;