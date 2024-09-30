import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, message } from "antd";
import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import {
    useUpdateSingleFuelMutation,
} from "@/redux/api/manageFuelApi";
import { SubmitHandler } from "react-hook-form";
import FormSelectField from "../ReusableForms/FormSelectField";
import { useDriverVehicleQuery } from "@/redux/api/driverApi";

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

const UpdateFuelForm = ({ fuelData }: any) => {
  const { vehicleVal, vendorName, Time, fuelType, price, province, gallons, meter, consumption, vehicle_id, id, photo } = fuelData;
  const [updateFuel] = useUpdateSingleFuelMutation();

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
  
  const [avater, setAvater] = useState(photo?photo:"");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");
  const [vehicleOptions, setVehicleOptions] = useState<{ label: string; value: string }[]>([]);
    const defaultValues = {
    vehicle_id: vehicle_id + "," + vehicleVal, 
    vendorName: vendorName,
    fuelType: fuelType,
    Time:Time.substring(0, 10),
    price: price,
    meter: meter,
    gallons: gallons,
    province:province ,
    photo: photo,
    consumption:consumption
  };
  const onSubmit: SubmitHandler<AddFuelValues> = async (updateData: any) => {
    const [vehicle_id, vehicle_val] = updateData?.vehicle_id.split(',');
    updateData.vehicleVal = vehicle_val;
    updateData.vehicle_id = vehicle_id;
    updateData.vendorName = updateData?.vendorName;
    updateData.fuelType = updateData?.fuelType;
    updateData.Time = new Date(updateData?.Time);
    updateData.gallons = parseFloat(updateData?.gallons);
    updateData.price = parseFloat(updateData?.price);
    updateData.province = updateData?.province;
    updateData.photo = avater ? avater : "https://i.ibb.co/SRF75vM/avatar.png";
    updateData.meter = parseInt(updateData?.meter);
    updateData.consumption = parseInt(updateData?.consumption);
    try {
      const res = await updateFuel({ id, ...updateData });
      if ((res as any)?.data?.statusCode === 200) {
      message.success("Fuel updated successfully");
    }
    } catch (error) {
      message.success("Something Went Wrong");
    }
    
    
  };
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
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div className="mb-4">
            <FormSelectField
              name="vehicle_id"
              size="large"
              placeholder="Select vehicle"
              options={vehicleOptions}
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
              placeholder="Price/Gallon(US)"
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
                name="photo"
                placeholder="Image"
                className="input input-bordered input-warning w-full max-w-x mt-2"
              onChange= {handleImageUpload}
            />
          </div>
          <Button
            htmlType="submit"
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update Fuel
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateFuelForm;
