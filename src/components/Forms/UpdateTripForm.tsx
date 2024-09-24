import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import FormSelectLabelField from "@/components/ReusableForms/FormSelectLabelField";

import {
  useTripSingleQuery,
  useUpdateSingleTripMutation,
} from "../../redux/api/tripApi";
import { useEffect, useState } from "react";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import FormSelectField from "../ReusableForms/FormSelectField";

type AddVehicleValues = {
  passengerName: string;
  phone: string;
  tripPeriod: string;
  tollCost: string;
  parkingCost: string;
  startLocation: string;
  description: string;
  tripId: string;
  status: string;
};
interface Driver {
    name: string;
    // Add any other properties of a driver here
}

interface DriverResult {
    driverResult: Driver[];
}

interface DriverVehicle {
    data: DriverResult;
}
type MyObjectType = {
    label: any;  // Replace 'any' with a more specific type if possible
    value: string;
};
const UpdateTripForm = ({ updateID }: any) => {
  const { data: singleTrip } = useTripSingleQuery(updateID);
  const [driverOptions, setDriverOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleValue, setVehicleValue] = useState<MyObjectType | undefined>(undefined);
  const [driverValue, setDriverValue] = useState<MyObjectType | undefined>(undefined);
  const statusOption = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'COMPLETED', value: 'COMPLETED' },
    { label: 'UPCOMMING', value: 'UPCOMMING' },
  ]
  const defaultValues = {
    status: singleTrip?.data?.status,
    passengerCount: singleTrip?.data?.passengerCount,
    tripPeriod: singleTrip?.data?.tripPeriod,
    tripRent: singleTrip?.data?.tripRent,
    startLocation: singleTrip?.data?.startLocation,
    endLocation: singleTrip?.data?.endLocation,
    startTime: singleTrip?.data?.startTime.substring(0, 10),
    passengerName: singleTrip?.data?.passengerName,
    passengerPhone: singleTrip?.data?.passengerPhone,
    driver_id: singleTrip?.data?.driver_id,
    vehicle_id: singleTrip?.data?.vehicle_id,    
  };

  const [updateTrip] = useUpdateSingleTripMutation();

  const onSubmit: SubmitHandler<AddVehicleValues> = async (data: any) => {
    data.passengerCount = parseInt(data?.passengerCount);
    data.tripRent = parseInt(data?.tripRent);
    data.startTime = new Date(data?.startTime);
    data.vehicleVal = vehicleValue?.label;
    data.driverVal = driverValue?.label;
    data.vehicle_id = vehicleValue?.value;
    data.driver_id = driverValue?.value;

    try {
      const res = await updateTrip({ id: updateID, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Trip updated successfully");
      }
    } catch (error) {
      message.success("Something Went Wrong");
    }
  };
    const { data: driverVehicle } = useDriverVehicleQuery({});
  useEffect(() => {
    if (driverVehicle?.data?.driverResult) {
            const options = driverVehicle.data.driverResult.map((driver: { name: any; id:any }) => ({
                label: driver.name,
                value: driver.id
            }));
            setDriverOptions(options);
    }
    if (driverVehicle?.data?.vehicleResult) {
            const options = driverVehicle.data.vehicleResult.map((vehicle: { brand: any;id:any  }) => ({
                label: vehicle.brand,
                value: vehicle.id
            }));
            setVehicleOptions(options);
        }
  }, [driverVehicle]);
const handleDriverChange = (value: string, option: any) => {
    const selected = {
      label: option.label,
      value: value
    };
    setDriverValue(selected);
  }
  const handleVehicleChange = (value: string, option: any) => {
    const selected = {
      label: option.label,
      value: value
    };
    setVehicleValue(selected);
  }
  return (
    <div>
      <h1>Update Trip For: {singleTrip?.data?.passengerName}</h1>
      <div className="mx-auto overflow-y-scroll p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div className="mb-4">
            <FormSelectField
              name="status"
              size="large"
              placeholder="Status (done / pending)"
              options={statusOption}
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="startLocation"
              type="text"
              placeholder="Start Location"
            />
          </div>
          
          <div className="mb-4">
            <FormInput
              name="endLocation"
              type="text"
              placeholder="End Location"
            />
          </div>

          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2">Date:</label>
            <FormInput
              name="startTime"
              type="date"
              placeholder="Trip Date"
            />
          </div>

          <div className="mb-4">
            <FormInput
              name="passengerName"
              type="text"
              placeholder="Passenger Name"
            />
          </div>
          
          <div className="mb-4">
            <FormInput
              name="passengerPhone"
              type="text"
              placeholder="Passenger Phone"
            />
          </div>
          
          <div className="mb-4">
            <FormInput
              name="passengerCount"
              type="number"
              placeholder="Total passenger Count"
            />
          </div> 
          
          <div className="mb-4">
            <FormInput
              name="tripPeriod"
              type="text"
              placeholder="Single-Trip | Round-Trip"
            />
          </div>
            
          <div className="mb-4">
            <FormInput
              name="tripRent"
              type="number"
              placeholder="$tripRent"
            />
          </div>
          <div className="mb-4">
            <FormSelectLabelField
              name="driver_id"
              size="large"
              placeholder="Select Driver"
              options={driverOptions}
              handleChange={handleDriverChange}
            />
          </div>
          <div className="mb-4">
            <FormSelectLabelField
              name="vehicle_id"
              size="large"
              placeholder="Select Vehicle"
              options={vehicleOptions}
              handleChange={handleVehicleChange}
            />
          </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg  bg-secondary text-[#eee]"
            // style={{
            //   backgroundColor: "#00334E",
            //   color: "#eee",
            // }}
          >
            Update Trip
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateTripForm;