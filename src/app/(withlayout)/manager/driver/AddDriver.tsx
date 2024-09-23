"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreateDriverMutation } from "@/redux/api/driverApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form"; 
import FormSelectField from "@/components/ReusableForms/FormSelectField";

type AddVehicleValues = {
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  experience: Number;
  nidNumber: string;
  license_no: string;
  license_expiry_date: Date;
  license_type: string;
  address: string;
  file: string;
  profilePic: string;
  score: Number;
  trans_distance: Number;
};

const AddDriver = () => {
  const [avater, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");
   const licenseType = [
    { label: 'Business', value: 'Business' },
    { label: 'Personal', value: 'Personal' },
   
  ];

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
  
  const [addDriver] = useCreateDriverMutation();
  const onSubmit: SubmitHandler<AddVehicleValues> = async (data: any) => {
    data.avatar = avater;
    data.experience = parseInt(data.experience);
    data.score = parseInt(data.score);
    data.trans_distance = parseFloat(data.trans_distance);
    data.license_expiry_date = new Date(data.license_expiry_date);

      const res = await addDriver(data);
    
      if((res as any)?.data?.statusCode === 200){
        message.success("Driver Created successful");
      }else{
        message.error("Something went wrong");
      } 
    

  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Driver</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="mb-4">
            <FormInput name="name" type="text" placeholder="Driver Name" />
          </div>
          <div className="mb-4">
            <FormInput name="email" type="text" placeholder="Driver Email" />
          </div>
          <div className="mb-4">
            <FormInput name="phone" type="text" placeholder="Phone Number" />
          </div>
          
          <div className="mb-4">
            <FormInput name="nid" type="text" placeholder="NID Number" />
          </div>
          <div className="mb-4">
            <FormInput name="license_no" type="text" placeholder="License No" />
          </div>
          <div className="mb-4">
            <FormInput name="license_expiry_date" type="date" placeholder="License Expiry Date" />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="license_type"
              size="large"
              placeholder="Type of License"
              options={licenseType}
            />
          </div>
          <div className="mb-4">
            <FormInput name="address" type="text" placeholder="Address" />
          </div>
          <div className="mb-4">
            <FormInput
              name="experience"
              type="number"
              placeholder="Experience (year)"
            />
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
          <div className="mb-4">
            <FormInput
              name="trans_distance"
              type="number"
              placeholder="Transported Distance (Km)"
            />
          </div>
          <div className="flex lg:flex-row flex-col gap-4 justify-center lg:items-center mt-2 py-2">
            
            <div className="form-control w-full max-w-x flex items-center gap-2"
            >
            <div className="w-2/5">
                <label className="label">
                    <span className="label-text text-gray-600 font-semibold">Profile Image</span>
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
                    placeholder="Image"
                    className="input input-bordered input-warning w-full max-w-x mt-2"
                  onChange= {handleImageUpload}
                />
          </div>
        </div>
                             

          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Driver Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddDriver;