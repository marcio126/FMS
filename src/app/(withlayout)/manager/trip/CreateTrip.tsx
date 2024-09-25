"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import { Button, message } from "antd";
import { useState,useEffect } from "react";
import { SubmitHandler } from "react-hook-form"; 
import { useCreateTripMutation } from "@/redux/api/tripApi";

import FormSelectField from "@/components/ReusableForms/FormSelectField";


type CreateTripValue = {
  passengerName: string;
  phone: string;
  tripPeriod: string;
  tollCost: string;
  parkingCost: string;
  startLocation: string;
  description: string;
  tripId: string;
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
const CreateTrip = () => {  
  const [driverOptions, setDriverOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleValue, setVehicleValue] = useState<MyObjectType | undefined>(undefined);
  const [driverValue, setDriverValue] = useState<MyObjectType | undefined>(undefined);
  const [createTrip] = useCreateTripMutation()

  const onSubmit: SubmitHandler<CreateTripValue> = async (data: any) => {
    data.status = "UPCOMMING";
    data.passengerCount = parseInt(data?.passengerCount);
    data.tripRent = parseInt(data?.tripRent);
    data.startTime = new Date(data?.startTime);
    const [vehicle_id, vehicle_val] = data?.vehicle_id.split(',');
    const [driver_id, driver_val] = data?.driver_id.split(',');
    data.vehicleVal = vehicle_val;
    data.driverVal = driver_val;
    data.vehicle_id = vehicle_id;
    data.driver_id = driver_id;
    const res = await createTrip(data) 

    if((res as any)?.data?.statusCode === 200){
      message.success(`Create Trip Sucessfully`);
    }
 
  };
  const { data: driverVehicle } = useDriverVehicleQuery({});
  useEffect(() => {
    if (driverVehicle?.data?.driverResult) {
            const options = driverVehicle.data.driverResult.map((driver: { name: any; id:any }) => ({
                label: driver.name,
                value: driver.id + "," + driver.name
            }));
            setDriverOptions(options);
    }
    if (driverVehicle?.data?.vehicleResult) {
            const options = driverVehicle.data.vehicleResult.map((vehicle: { brand: any;id:any  }) => ({
                label: vehicle.brand,
                value: vehicle.id + "," + vehicle.brand
            }));
            setVehicleOptions(options);
        }
  }, [driverVehicle]);


  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Create A New Trip</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
         
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
            <FormSelectField
              name="driver_id"
              size="large"
              placeholder="Select Driver"
              options={driverOptions}
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="vehicle_id"
              size="large"
              placeholder="Select Vehicle"
              options={vehicleOptions}
            />
          </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg"
            style={{
              backgroundColor: "#00334E",
              color: "#eee",
            }}
          >
            New Driver Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default CreateTrip;
