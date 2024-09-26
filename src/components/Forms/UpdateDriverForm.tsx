import { useState } from 'react';
import Image from "next/image";
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import { useUpdateDriverMutation } from "@/redux/api/driverApi";
import FormSelectField from '../ReusableForms/FormSelectField';

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
  avatar: string;
};

const UpdateDriverForm = ({ driverData }: any) => { 
  const { name, phone, experience, email, nid, license_no, license_expiry_date, license_type, score, trans_distance,address,avatar, id } = driverData;
  const defaultValues = {
    name: name,
    email:email,
    phone: phone,
    address: address,
    avatar:avatar,
    nid: nid,
    license_no: license_no,
    license_expiry_date: license_expiry_date.substring(0, 10),
    license_type: license_type,
    score: score,
    trans_distance: trans_distance,
    experience: experience,

  };
  const [avater, setAvater] = useState(avatar?avatar:"");
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
  const [updateDriver] = useUpdateDriverMutation();
  const onSubmit: SubmitHandler<AddVehicleValues> = async (data: any) => {
    data.id = id;
    data.avatar = avater?avater : "https://i.ibb.co/SRF75vM/avatar.png";
    data.experience = parseInt(data.experience);
    data.score = parseInt(data.score);
    data.trans_distance = parseFloat(data.trans_distance);
    data.license_expiry_date = new Date(data.license_expiry_date);
    try {
      const res = await updateDriver({id, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Driver updated successfully");
      }
    } catch (error) {
      console.log("driver update error", error);
    }
  };
  return (
    <>
      <div className="mx-auto overflow-y-scroll p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
                name="avatar"
                placeholder="Image"
                className="input input-bordered input-warning w-full max-w-x mt-2"
              onChange= {handleImageUpload}
            />
            </div>
            </div>
          <Button
            htmlType="submit"
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateDriverForm;
