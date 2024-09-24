"use client";
import { useState } from "react";
import Image from "next/image";
import { Button, message } from "antd";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import FormTextArea from "@/components/ReusableForms/FormTextArea";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import { useCreateFuelMutation } from "@/redux/api/manageFuelApi";
import { formatDate, formatDateToRegularDate } from "@/utils/formateDate";

import { SubmitHandler } from "react-hook-form";

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

const AddManageFuel = () => {
  const vehicleArr = [
    { label: '1100 [2018 Toyota Prius]', value: '1100 [2018 Toyota Prius]' },
    { label: '2100 [2016 Ford F-150]', value: '2100 [2016 Ford F-150]' },
    { label: '3100 [2014 Chevrolet Express Cargo]', value: '3100 [2014 Chevrolet Express Cargo]' },
    { label: '4100 [2012 Freightliner Cascadia]', value: '4100 [2012 Freightliner Cascadia]' },
    { label: '5100 [2010 Utility Reefer]', value: '5100 [2010 Utility Reefer]' },
    { label: '6100 [2017 Hyster H50XM]', value: '6100 [2017 Hyster H50XM]' }
  ];
  const vendorArr = [
    { label: 'Chevron', value: 'Chevron' },
    { label: 'Shell #4291', value: 'Shell #4291' },
    { label: 'Shell #5820', value: 'Shell #5820' }
  ]
  const tyoeArr = [
    { label: 'BioDiesel', value: 'BioDiesel' },
    { label: 'Compressed Natural Gas', value: 'Compressed Natural Gas' },
    { label: 'DEF', value: 'DEF' },
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Diesel/Electric Hybrid', value: 'Diesel/Electric Hybrid' },
    { label: 'Electric', value: 'Electric' },
    { label: 'Flex Fuel', value: 'Flex Fuel' },
    { label: 'Gas/Electric Hybrid', value: 'Gas/Electric Hybrid' },
    { label: 'Gasoline', value: 'Gasoline' },
    { label: 'Plug-in Hybrid', value: 'Plug-in Hybrid' },
    { label: 'Propane', value: 'Propane' },

  ]
  const [selectedDriver, setSelectedDriver] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [createFuel] = useCreateFuelMutation();
  const [avater, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");

  const onSubmit: SubmitHandler<CreateTripValue> = async (data: any) => {
    // data.status = "UPCOMMING";
    data.vehicle = data?.vehicle;
    data.vendorName = data?.vendorName;
    data.fuelTyoe = data?.fuelTyoe;
    data.Time = new Date(data?.Time);
    data.gallons = parseFloat(data?.gallons);
    data.price = parseFloat(data?.price);
    data.invoice = data?.invoice;
    data.photo = avater ? avater : "https://i.ibb.co/SRF75vM/avatar.png";
    data.comments = data?.comments;
    // data.vehicle_id = selectedVehicle;
    // data.driver_id = selectedDriver;
    const res = await createFuel(data);

    if ((res as any)?.data?.statusCode === 200) {
      message.success(`Create Trip Sucessfully`);
    }
  };

  
  const handleImageUpload = (e : any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setCurrentImage((reader as any)?.result);
      };
      reader.readAsDataURL(file);
  } else {
      setCurrentImage(currentImage);
  }

        const imageStoragekey = '68cb5fb5d48334a60f021c30aff06ada'
        
        const formData = new FormData()
        formData.append('image', file)
        fetch(`https://api.imgbb.com/1/upload?key=${imageStoragekey}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(result => setAvater(result?.data?.display_url))


  }
  function handleSelectDriver(event: any) {
    setSelectedDriver(event.target.value);
  }
  function handleSelectVehicle(event: any) {
    setSelectedVehicle(event.target.value);
  }

  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Fuel Page</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="mb-4">
            <FormSelectField
              name="vehicle"
              size="large"
              placeholder="Select vehicle"
              options={vehicleArr}
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="vendorName"
              size="large"
              placeholder="Vendor Name"
              options={vendorArr}
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="fuelTyoe"
              size="large"
              placeholder="Fuel tyoe"
              options={tyoeArr}
            />
          </div>

          <div className="mb-4 flex gap-2 items-center">
            <label className="mr-2">Purchase Date:</label>
            <FormInput name="Time" type="date" placeholder="Purchase Date" />
          </div>

          <div className="mb-4">
            <FormInput
              name="gallons"
              type="number"
              placeholder="Gallons(US)"
            />
          </div>

          <div className="mb-4">
            <FormInput
              name="price"
              type="number"
              placeholder="Price/Gallon(US)"
            />
          </div>

          <div className="mb-4">
            <FormInput
              name="invoice"
              type="text"
              placeholder="Invoice number, transaction ID, etc"
            />
          </div>

          <div className="mb-4 flex gap-2">
              <div className="w-12 h-12 rounded-full">
              <Image
                      src={currentImage}
                      alt='avater'
                      className="w-full
                      object-cover"
                      width={0}
                      height={0}
                      unoptimized
                  />
            </div>
            <input
                type="file"
                placeholder="Image"
                className="input input-bordered input-warning w-full max-w-x mt-2"
              onChange= {handleImageUpload}
            />
          </div>
          <div className="mb-4">
            <FormTextArea
              name="comments"
              label="Comments"
              placeholder="Comments"
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
            Add Fuel
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddManageFuel;
