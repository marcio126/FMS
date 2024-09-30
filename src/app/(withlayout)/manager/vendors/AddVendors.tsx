"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateVendorsMutation } from "@/redux/api/vendorsApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form"; 
import FormSelectField from "@/components/ReusableForms/FormSelectField";

type AddVendorsValues = {
  avatar?:string;
  name?:string;
  email?: string;
  phone?: string;
  vendorType?:string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  website?: string;
  province?: string;
  note?: string;
  rating?: number;
};
const AddVendors = () => {
  const [avater, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");
  const vendorOption = [
    { label: "Parts", value: "Parts" },
    { label: "Fuel", value: "Fuel" },
    { label: "Machimaries", value: "Machimaries" }
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
  
  const [addVendors] = useCreateVendorsMutation();
  const onSubmit: SubmitHandler<AddVendorsValues> = async (data: any) => {
    data.avatar = avater;
    data.rating = parseInt(data.rating);

    const res = await addVendors(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Vendor Created successful");
    }else{
      message.error("Something went wrong");
    } 
    
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Vendor</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-4 justify-center lg:items-center mt-2 py-2">
            <div className="form-control w-full max-w-x flex items-center gap-2"
            >
            <div className="w-2/5">
                <label className="label">
                    <span className="label-text text-gray-600 font-semibold">Vendor Image</span>
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
                name="avatar"
                placeholder="Image"
                className="input input-bordered input-warning w-full max-w-x mt-2"
              onChange= {handleImageUpload}
            />
          </div>
        </div>
        <div className="mb-4">
          <FormInput name="name" type="text" placeholder="Vendor Name" />
        </div>
        <div className="mb-4">
          <FormInput name="email" type="email" placeholder="Vendor Email" />
        </div>
        <div className="mb-4">
          <FormInput name="phone" type="text" placeholder="Vendor Number" />
        </div>
        <div className="mb-4">
          <FormInput name="address" type="text" placeholder="Address" />
        </div>
          <div className="mb-4">
          <FormInput name="city" type="text" placeholder="City" />
        </div>
        <div className="mb-4">
          <FormInput name="country" type="text" placeholder="Country" />
        </div>
        <div className="mb-4">
          <FormInput name="postalCode" type="text" placeholder="postalCode" />
        </div>
          <div className="mb-4">
            <FormSelectField options={vendorOption} name="vendorType" placeholder="Vendor Type"/>
        </div>
        <div className="mb-4">
          <FormInput name="website" type="text" placeholder="website" />
        </div>
        <div className="mb-4">
          <FormInput name="province" type="text" placeholder="province" />
        </div>
        <div className="mb-4">
          <FormInput name="note" type="text" placeholder="note" />
        </div>
        <div className="mb-4">
          <FormInput
            name="rating"
            type="number"
            placeholder="Rating / Score (1-5)"
            min="1"
            max="5"
          />
        </div>
          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Customer Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddVendors;