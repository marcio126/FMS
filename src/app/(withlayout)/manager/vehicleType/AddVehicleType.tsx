"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateVehicleTypeMutation } from "@/redux/api/vehicleTypeApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form"; 
import FormSelectField from "@/components/ReusableForms/FormSelectField";

type AddVehicleTypeValues = {
  icon: string;
  type: string;
  display_name: string;
  seats: string;
  enable: boolean;
};
const AddVehicleType = () => {
  const [avater, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");
  const enableOption = [
    { label: "Enable", value: "enable" },
    { label:"Disable", value: "disable"}
  ]

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
  
  const [addVehicleType] = useCreateVehicleTypeMutation();
  const onSubmit: SubmitHandler<AddVehicleTypeValues> = async (data: any) => {
    data.icon = avater;
    data.seats = parseInt(data.seats);
    data.enable = data.enable=="enable"?true:false;
    const res = await addVehicleType(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Vehicle Type Created successful");
    }else{
      message.error("Something went wrong");
    } 
    
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Vehicle Type</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-4 justify-center lg:items-center mt-2 py-2">
            <div className="form-control w-full max-w-x flex items-center gap-2"
            >
            <div className="w-2/5">
                <label className="label">
                    <span className="label-text text-gray-600 font-semibold">Vehicle Icon Image</span>
                </label>
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
            </div> 
            <input
                type="file"
                name="icon"
                placeholder="Image"
                className="input input-bordered input-warning w-full max-w-x mt-2"
              onChange= {handleImageUpload}
            />
          </div>
        </div>
        <div className="mb-4">
          <FormInput name="type" type="text" placeholder="Vehicle Type" />
        </div>
        <div className="mb-4">
          <FormInput name="display_name" type="text" placeholder="Display Name" />
        </div>
        <div className="mb-4">
          <FormInput name="seats" type="number" placeholder="seats Number" />
        </div>
          <div className="mb-4">
            <FormSelectField
              name="enable"
              size="large"
              placeholder="Enable"
              options={enableOption}
            />
        </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Vehicle Type Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddVehicleType;