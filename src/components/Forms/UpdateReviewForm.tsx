import { useEffect, useState } from 'react';
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import { useUpdateReviewMutation } from "@/redux/api/reviewApi";
import { useDriverVehicleQuery } from '@/redux/api/driverApi';
import FormSelectField from '../ReusableForms/FormSelectField';

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

const UpdateVehicleInspectionForm = ({ reviewData }: any) => { 
  const { vehicle, personcharge, score, status, note, id } = reviewData;
  const defaultValues = {
    vehicle: vehicle,
    personcharge:personcharge,
    score: score,
    status: status,
    note: note,
  };
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
  const [updateReview] = useUpdateReviewMutation();
  const onSubmit: SubmitHandler<AddReviewValues> = async (data: any) => {
    data.id = id;
    data.score = parseInt(data.score);
    const [vehicle_id, vehicle_val] = data?.vehicle.split(',');
    data.vehicle = vehicle_val;
    try {
      const res = await updateReview({id, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Review updated successfully");
      }
    } catch (error) {
      console.log("Review update error", error);
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
            <FormInput name="personcharge" type="text" placeholder="Person in charge" />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="status"
              size="large"
              placeholder="Status"
              options={statusOptions}
            />
          </div>
          <div className="mb-4">
            <FormInput name="score" type="number" placeholder="Score" />
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

export default UpdateVehicleInspectionForm;
