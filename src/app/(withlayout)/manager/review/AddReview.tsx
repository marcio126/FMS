"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";
import { getTokenFromKey } from "@/services/auth.service";
import { useGetProfileQuery } from "@/redux/api/authApi";

import { Button,message } from "antd";
import { SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import { useGetAllListCustomerQuery } from "@/redux/api/customerApi";

import FormSelectField from "@/components/ReusableForms/FormSelectField";

type AddReviewValues = {
  giver: string;
  receiver: string;
  score: number;
  badge: string;
  note: string;
};

const AddReview = () => {
  const [userProfile, setUserProfile] = useState<any>({});
  const userInfo = getTokenFromKey();
  const { data: getProfile } = useGetProfileQuery(userInfo?.id);
  useEffect(() => {
    if (getProfile != undefined) {
      setUserProfile(getProfile.data);
      }
  }, [getProfile]);
  const role = userProfile.role;
  
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
    const { data: driverVehicle } = useDriverVehicleQuery({});
  useEffect(() => {
    if (driverVehicle?.data?.vehicleResult) {
            const options = driverVehicle.data.vehicleResult.map((vehicle: { vehicleName: any;id:any  }) => ({
                label: vehicle.vehicleName,
                value: vehicle.vehicleName
            }));
            setVehicleOptions(options);
        }
  }, [driverVehicle]);
  const [ customerOptions, setCustomerOptions] = useState<{ label: string; value: string }[]>([]);

  const {data:allCustomer} = useGetAllListCustomerQuery({})
  const [driverOptions, setDriverOptions] = useState<{ label: string; value: string }[]>([]);
  useEffect(() => {
    if (driverVehicle?.data?.driverResult) {
            const options = driverVehicle.data.driverResult.map((driver: { name: any; id:any }) => ({
                label: driver.name,
                value: driver.name
            }));
            setDriverOptions(options);
    }
  }, [driverVehicle]);
  useEffect(() => {
    if (allCustomer?.data) {
            const options = allCustomer.data.map((customer: { name: any  }) => ({
                label: customer.name,
                value: customer.name
            }));
            setCustomerOptions(options);
        }
  }, [allCustomer]);

  const [addReview] = useCreateReviewMutation();
  const onSubmit: SubmitHandler<AddReviewValues> = async (data: any) => {
    data.receiver = data.receiver;
    data.giver = userProfile.name;
    data.score = parseInt(data.score);
    data.badge = "false";
    const res = await addReview(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Review Created successful");
    }else{
      message.error("Something went wrong");
    } 
    
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Review</p>
      <div className="mx-auto overflow-y-scroll ">
        {(role=="MANAGER") ? (
          <Form submitHandler={onSubmit}>
            <div className="mb-4">
              <FormSelectField
                name="receiver"
                size="large"
                placeholder="Select Vehicle"
                options={vehicleOptions}
              />
            </div>
            <div className="mb-4">
              <FormInput name="score" type="number" placeholder="Score" min="1"
              max="5"/>
            </div>
            <div className="mb-4">
              <FormInput name="note" type="text" placeholder="Note" />
            </div>
              <Button
                htmlType="submit"
                className="text-md rounded-lg bg-secondary text-[#eee]"
              >
                New Review Add
              </Button>
          </Form>
        ) : (role=="DRIVER")?(
            <Form submitHandler={onSubmit}>
            <div className="mb-4">
              <FormSelectField
                name="receiver"
                size="large"
                placeholder="Select Customer"
                options={customerOptions}
              />
            </div>
            <div className="mb-4">
              <FormInput name="score" type="number" placeholder="Score" min="1"
              max="5"/>
            </div>
            <div className="mb-4">
              <FormInput name="note" type="text" placeholder="Note" />
            </div>
              <Button
                htmlType="submit"
                className="text-md rounded-lg bg-secondary text-[#eee]"
              >
                New Review Add
              </Button>
          </Form>
          ) : (
              <Form submitHandler={onSubmit}>
            <div className="mb-4">
              <FormSelectField
                name="receiver"
                size="large"
                placeholder="Select Driver"
                options={driverOptions}
              />
            </div>
            <div className="mb-4">
              <FormInput name="score" type="number" placeholder="Score" min="1"
              max="5"/>
            </div>
            <div className="mb-4">
              <FormInput name="note" type="text" placeholder="Note" />
            </div>
              <Button
                htmlType="submit"
                className="text-md rounded-lg bg-secondary text-[#eee]"
              >
                New Review Add
              </Button>
          </Form>
        )}
      </div>
    </>
  );
};

export default AddReview;