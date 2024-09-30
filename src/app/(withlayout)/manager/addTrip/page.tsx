"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import { Button, message } from "antd";
import { useState,useEffect } from "react";
import { SubmitHandler } from "react-hook-form"; 
import { useCreateTripMutation } from "@/redux/api/tripApi";
import { getTokenFromKey } from "@/services/auth.service";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useGetProfileQuery } from "@/redux/api/authApi";

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

type MyObjectType = {
    label: any;  // Replace 'any' with a more specific type if possible
    value: string;
};
const tripTypeOption = [
  { label: "Single", value: "Single" },
  { label: "Round", value: "Round" }
];
const page = () => {
  const [driverOptions, setDriverOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [userProfile, setUserProfile] = useState<any>({});
  
  const userInfo = getTokenFromKey();
  const { data: getProfile } = useGetProfileQuery(userInfo?.id);
  const [createTrip] = useCreateTripMutation();
  const { data: driverVehicle } = useDriverVehicleQuery({});

  useEffect(() => {
    if (getProfile != undefined) {
      setUserProfile(getProfile.data);
      }
  }, [getProfile]);
  const paymentOption = [
    { label: "Paypal", value: "Paypal" },
    { label: "Payoneer", value: "Payoneer" },
    { label: "Crypto", value: "Crypto" },
    { label: "Bank", value: "Bank" },
    { label: "Real-Money", value: "Real-Money" }

  ];
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
  const onSubmit: SubmitHandler<CreateTripValue> = async (data: any) => {
    data.status = "UPCOMMING";
    data.passengerName = userProfile.name;
    data.passengerPhone = userProfile.phone;
    data.passengerCount = parseInt(data?.passengerCount);
    data.tripRent = parseInt(data?.tripRent);
    data.startTime = new Date(data?.startTime);
    const [vehicle_id, vehicle_val] = data?.vehicle_id.split(',');
    const [driver_id, driver_val] = data?.driver_id.split(',');
    data.vehicleVal = vehicle_val;
    data.vehicle_id = vehicle_id;
    data.driverVal = driver_val;
    data.driver_id = driver_id;
    const res = await createTrip(data) 

    if((res as any)?.data?.statusCode === 200){
      message.success(`Create Trip Sucessfully`);
    }
 
  };
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Create A New Trip</p>
      <div className="mx-auto ">
        <Form submitHandler={onSubmit}>
         
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Start Location:</label>
            <FormInput
              name="startLocation"
              type="text"
              placeholder="Start Location"
            />
          </div>
          
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">End Location:</label>
            <FormInput
              name="endLocation"
              type="text"
              placeholder="End Location"
            />
          </div>

          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Date:</label>
            <FormInput
              name="startTime"
              type="date"
              placeholder="Trip Date"
            />
          </div>
          
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Select Payment</label>
            <FormSelectField
              options={paymentOption}
              name="payment"
              placeholder="Payment"
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Passenger Count:</label>
            <FormInput
              name="passengerCount"
              type="number"
              placeholder="Total passenger Count"
            />
          </div> 
          
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Trip Type Period:</label>
            <FormSelectField
              options={tripTypeOption}
              name="tripPeriod"
              placeholder="Single-Trip | Round-Trip"
            />
          </div>
            
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Price:</label>
            <FormInput
              name="tripRent"
              type="number"
              placeholder="Trip Price"
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Select Driver:</label>
            <FormSelectField
              name="driver_id"
              size="large"
              placeholder="Select Driver"
              options={driverOptions}
            />
          </div>
          <div className="mb-4 flex gap-2 items-center">
          <label className="mr-2 w-36">Select Vehicle:</label>
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
            Add Trip Booking
          </Button>
        </Form>
      </div>
    </>
  );
};

export default page;
