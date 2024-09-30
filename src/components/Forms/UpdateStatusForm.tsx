import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import {
  useTripSingleQuery,
  useUpdateSingleTripMutation,
} from "../../redux/api/tripApi";
import { useEffect, useState } from "react";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import { useGetAllListCustomerQuery } from "@/redux/api/customerApi";

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
  payment: string;
};
type MyObjectType = {
    label: any;  // Replace 'any' with a more specific type if possible
    value: string;
};
const UpdateStatusForm = ({ tripData }: any) => {
  const { data: singleTrip } = useTripSingleQuery(tripData);
  const [driverOptions, setDriverOptions] = useState<{ label: string; value: string }[]>([]);
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [ customerOptions, setCustomerOptions] = useState<{ label: string; value: string }[]>([]);
  const statusOption = [
    { label: 'PENDING', value: 'PENDING' },
    { label: 'COMPLETED', value: 'COMPLETED' },
    { label: 'UPCOMMING', value: 'UPCOMMING' },
  ]

  const { data: allCustomer } = useGetAllListCustomerQuery({});
  const [updateTrip] = useUpdateSingleTripMutation();

  const defaultValues = {
    status: singleTrip?.data?.status,
  };
  useEffect(() => {
    if (allCustomer?.data) {
            const options = allCustomer.data.map((customer: { name: any  }) => ({
                label: customer.name,
                value: customer.name
            }));
            setCustomerOptions(options);
        }
  }, [allCustomer]);

    const onSubmit: SubmitHandler<AddVehicleValues> = async (data: any) => {
    data.status = data.status,
    data.tripPeriod = singleTrip?.data?.tripPeriod,
    data.startLocation = singleTrip?.data?.startLocation,
    data.endLocation = singleTrip?.data?.endLocation,
    data.passengerName = singleTrip?.data?.passengerName,
    data.passengerPhone = singleTrip?.data?.passengerPhone, 
    data.payment = singleTrip?.data?.payment
    data.passengerCount = parseInt(singleTrip?.data?.passengerCount);
    data.tripRent = parseInt(singleTrip?.data?.tripRent);
    data.startTime = new Date(singleTrip?.data?.startTime.substring(0, 10));
    data.vehicle_id = singleTrip?.data?.vehicle_id;
    data.vehicleVal = singleTrip?.data?.vehicleVal;
    data.driver_id = singleTrip?.data?.driver_id;
    data.driverVal = singleTrip?.data?.driverVal;
    try {
      const res = await updateTrip({ id: tripData, ...data });
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
    <div>
      <h1>Update Trip For: {singleTrip?.data?.passengerName}</h1>
      <div className="mx-auto p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div className="mb-4">
            <FormSelectField
              name="status"
              size="large"
              placeholder="Status (done / pending)"
              options={statusOption}
            />
          </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg  bg-secondary text-[#eee]"
          >
            Approve or Reject
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateStatusForm;