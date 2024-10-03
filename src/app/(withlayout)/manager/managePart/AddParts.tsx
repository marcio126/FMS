"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useCreatePartsMutation } from "@/redux/api/partsApi";
import { Button } from "antd";
import { SubmitHandler } from "react-hook-form";
import { message } from "antd";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form"; 
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useGetAllListVendorsQuery } from "@/redux/api/vendorsApi";

type AddPartsValues = {
  avatar?:string;
  name?:string;
  reg_number?: string;
  description?: string;
  status?:string;
  available?: boolean;
  vendor?: string;
  category?: string;
  manufacturer?: string;
  year?: number;
  model?: string;
  qty_hand?: number;
  unit_cost?: number;
  note?: string;
};
const statusOption = [
  { label: "Active", value: "Active" },
  { label: "Pending", value: "Pending" },
  { label: "Processing", value: "Processing" },
  { label: "Completed", value: "Completed" },
  { label: "Hold", value: "Hold" },
];
const availableOption = [
  {label:"Available",value:"Available"},
  {label:"Not Available",value:"Not Available"}
]
const categoryOption = [
  {label:"Engine Components",value:"Engine Components"},
  {label:"Transmission Parts",value:"Transmission Parts"},
  {label:"Suspension & Steering",value:"Suspension & Steering"},
  {label:"Braking System",value:"Braking System"},
  {label:"Electrical System",value:"Electrical System"},
  {label:"Fuel System",value:"Fuel System"},
  {label:"Exhaust System",value:"Exhaust System"},
  {label:"Cooling System",value:"Cooling System"},
  {label:"Body & Interior",value:"Body & Interior"},
  {label:"Wheels & Tires",value:"Wheels & Tires"},
  {label:"Lighting & Signals",value:"Lighting & Signals"},
  {label:"Climate Control System",value:"Climate Control System"},
  {label:"Accessories & Add-ons",value:"Accessories & Add-ons"},
]
const AddParts = () => {
  const [avater, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avater || "https://i.ibb.co/SRF75vM/avatar.png");

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
  const [vendorOptions, setVendorOptions] = useState<{ label: string; value: string }[]>([]);

  const { data: vendors } = useGetAllListVendorsQuery({});
  console.log(vendors);
  useEffect(() => {
  if (vendors?.data) {
    const options = vendors.data
      .filter((vendor:{vendorType:string})=>vendor.vendorType === "Parts")
      .map((vendor: { name: any }) => ({
              label: vendor.name,
              value: vendor.name
          }));
          setVendorOptions(options);
      }
  }, [vendors]);
  const [addParts] = useCreatePartsMutation();
  const onSubmit: SubmitHandler<AddPartsValues> = async (data: any) => {
    data.avatar = avater?avater : "https://i.ibb.co/SRF75vM/avatar.png";
    data.reg_number = parseInt(data.reg_number);
    data.available = data.available == "Available" ? true : false;
    data.year = parseInt(data.year);
    data.qty_hand = parseInt(data.qty_hand);
    data.unit_cost = parseInt(data.unit_cost);

    const res = await addParts(data);
    if((res as any)?.data?.statusCode === 200){
      message.success("Parts Created successful");
    }else{
      message.error("Something went wrong");
    } 
    
  };
  
  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Part</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="flex lg:flex-row flex-col gap-4 justify-center lg:items-center mt-2 py-2">
            <div className="form-control w-full max-w-x flex items-center gap-2"
            >
            <div className="w-2/5">
                <label className="label">
                    <span className="label-text text-gray-600 font-semibold">Part Image</span>
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
          <FormInput name="name" type="text" placeholder="Part Name" />
        </div>
        <div className="mb-4">
          <FormInput name="reg_number" type="number" placeholder="Reg_number" />
        </div>
        <div className="mb-4">
          <FormInput name="description" type="text" placeholder="Description" />
        </div>
        <div className="mb-4">
          <FormSelectField options={statusOption} name="status" placeholder="Status"/>
        </div>
        <div className="mb-4">
          <FormSelectField options={availableOption} name="available" placeholder="Available"/>
        </div>
        <div className="mb-4">
          <FormSelectField options={vendorOptions} name="vendor" placeholder="Vendor"/>
        </div>
        <div className="mb-4">
          <FormSelectField options={categoryOption} name="category" placeholder="Category"/>
        </div>
        <div className="mb-4">
          <FormInput name="manufacturer" type="text" placeholder="Manufacturer" />
        </div>
          <div className="mb-4">
          <FormInput name="year" type="number" placeholder="Year" />
        </div>
        <div className="mb-4">
          <FormInput name="model" type="text" placeholder="Model" />
        </div>
        <div className="mb-4">
          <FormInput name="qty_hand" type="number" placeholder="Qty_hand" />
        </div>
        <div className="mb-4">
          <FormInput name="unit_cost" type="number" placeholder="Unit cost" />
        </div>
        <div className="mb-4">
          <FormInput name="note" type="text" placeholder="Note" />
        </div>
        
          <Button
            htmlType="submit"
            className="text-md rounded-lg bg-secondary text-[#eee]"
          >
            New Part Add
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddParts;