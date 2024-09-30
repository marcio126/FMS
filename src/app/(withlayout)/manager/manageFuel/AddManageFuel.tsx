"use client";
import { useState,useEffect } from "react";
import Image from "next/image";
import { Button, message } from "antd";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";
import { useGetAllListVendorsQuery } from "@/redux/api/vendorsApi";
import { useCreateFuelMutation } from "@/redux/api/manageFuelApi";

import { SubmitHandler } from "react-hook-form";

type AddFuelValues = {
  vehicleVal: string;
  vendorName: string;
  fuelType: string;
  Time: Date;
  gallons: Number;
  price: Number;
  meter: Number;
  photo: string;
  province: string;
  consumption: number;
};

const AddManageFuel = () => {
  const vendorArr = [
    { label: 'Chevron', value: 'Chevron' },
    { label: 'Shell #4291', value: 'Shell #4291' },
    { label: 'Shell #5820', value: 'Shell #5820' }
  ]
  const typeArr = [
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
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
  const [vendorOptions, setVendorOptions] = useState<{ label: string; value: string }[]>([]);
  const [createFuel] = useCreateFuelMutation();
  const { data: driverVehicle } = useDriverVehicleQuery({});
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
  const [avater, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");

  const onSubmit: SubmitHandler<AddFuelValues> = async (data: any) => {
    // data.status = "UPCOMMING";
    data.vendorName = data?.vendorName;
    data.fuelType = data?.fuelType;
    data.Time = new Date(data?.Time);
    data.gallons = parseFloat(data?.gallons);
    data.price = parseFloat(data?.price);
    data.meter = parseInt(data?.meter);
    data.province = data?.province;
    data.consumption = parseInt(data?.consumption);
    
    data.photo = avater ? avater : "https://i.ibb.co/SRF75vM/avatar.png";

    const [vehicle_id, vehicle_val] = data?.vehicle_id.split(',');
    data.vehicleVal = vehicle_val;
    data.vehicle_id = vehicle_id;
    data.vendorName = data?.vendorName;
    console.log(data);
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

  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Fuel Page</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="mb-4">
            <FormSelectField
              name="vehicle_id"
              size="large"
              placeholder="Select Vehicle"
              options={vehicleOptions}
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="vendorName"
              size="large"
              placeholder="Vendor Name"
              options={vendorOptions}
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="fuelType"
              size="large"
              placeholder="Fuel type"
              options={typeArr}
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
              placeholder="Price"
            />
          </div>

          <div className="mb-4">
            <FormInput
              name="meter"
              type="number"
              placeholder="Meter"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="province"
              type="text"
              placeholder="State/Province"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="consumption"
              type="number"
              placeholder="Consumption"
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
