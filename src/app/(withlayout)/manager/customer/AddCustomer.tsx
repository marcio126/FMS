"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateCustomerMutation } from "@/redux/api/customerApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form"; 
import FormSelectField from "@/components/ReusableForms/FormSelectField";

type AddCustomerValues = {
  avatar: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  score: Number;
};
const AddCustomer = () => {
  const [avater, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");
  const genderOption = [
    { label: "Man", value: "man" },
    { label:"Woman", value: "woman"}
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
  
  const [addCustomer] = useCreateCustomerMutation();
  const onSubmit: SubmitHandler<AddCustomerValues> = async (data: any) => {
    data.avatar = avater;
    data.score = parseInt(data.score);

    const res = await addCustomer(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Customer Created successful");
    }else{
      message.error("Something went wrong");
    } 
    
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Customer</p>
      <div className="mx-auto">
        <Form submitHandler={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-4 justify-center lg:items-center mt-2 py-2">
            <div className="form-control w-full max-w-x flex items-center justify-center gap-2"
            >
            <div className="w-2/5">
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
          <FormInput name="name" type="text" placeholder="Customer Name" />
        </div>
        <div className="mb-4">
          <FormInput name="email" type="email" placeholder="Customer Email" />
        </div>
        <div className="mb-4">
          <FormInput name="phone" type="text" placeholder="Phone Number" />
        </div>
        <div className="mb-4">
          <FormInput name="address" type="text" placeholder="Address" />
        </div>
        <div className="mb-4">
          <FormInput
            name="score"
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

export default AddCustomer;