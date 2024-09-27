import { useEffect, useState } from 'react';
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import { useUpdateOrderMutation } from "@/redux/api/orderApi";
import { useDriverVehicleQuery } from '@/redux/api/driverApi';
import FormSelectField from '../ReusableForms/FormSelectField';
import { useGetAllListVendorsQuery } from '@/redux/api/vendorsApi';

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
const statusOption = [
  { label: "pending", value: "pending" },
  { label: "processing", value: "processing" },
  { label: "completed", value: "completed" },
  { label: "hold", value: "hold" }
]
const UpdateOrderForm = ({ orderData }: any) => { 
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [vendorOptions, setVendorOptions] = useState<{ label: string; value: string }[]>([]);
  const { data: vendors } = useGetAllListVendorsQuery({});
  const [updateOrder] = useUpdateOrderMutation();
  const { data: driverVehicle } = useDriverVehicleQuery({});
  const { vendor,vehicle, issuedby, requiredby, cost, status,issuedto,assignedto,note, id } = orderData;
  
  const defaultValues = {
    vehicle: vehicle,
    vendor:vendor,
    issuedby: issuedby.substring(0,10),
    requiredby: requiredby.substring(0,10),
    cost: cost,
    status: status,
    issuedto: issuedto,
    assignedto: assignedto,
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
  const onSubmit: SubmitHandler<AddOrderValues> = async (data: any) => {
    data.id = id;
    const [vehicle_id, vehicle_val] = data?.vehicle.split(',');
    data.vehicle = vehicle_val;
    data.issuedby = new Date(data.issuedby);
    data.requiredby = new Date(data.requiredby);
    data.cost = Number(data.cost);

    try {
      const res = await updateOrder({id, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Order updated successfully");
      }
    } catch (error) {
      console.log("Order update error", error);
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
              <FormInput name="issuedby" type="date" placeholder="Issued by" />
            </div>
            <div className="mb-4">
              <FormInput name="requiredby" type="date" placeholder="Required by" />
            </div>
            <div className="mb-4">
              <FormInput name="cost" type="number" placeholder="cost" />
            </div>
            <div className="mb-4">
              <FormSelectField
                name="status"
                size="large"
                placeholder="Status"
                options={statusOption}
              />
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
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateOrderForm;
