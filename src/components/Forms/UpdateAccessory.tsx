import { useState } from "react";
import Image from "next/image";
import { SubmitHandler } from "react-hook-form";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useUpdateAccessoryMutation } from "@/redux/api/accessoryApi";
import { Button, message } from "antd"; 

const statusTypeOption = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "hold", label: "Hold" },
];
const vendorOption = [
  { value: "Volkswagen AG (VWAGY)", label: "Volkswagen AG (VWAGY)" },
  { value: "Toyota Motor Corp. ( TM)", label: "Toyota Motor Corp. ( TM)" },
  { value: "Stellantis (STLA)", label: "Stellantis (STLA)" },
  { value: "Mercedes Benz AG (MBGYY)", label: "Mercedes Benz AG (MBGYY)" },
  { value: "Ford Motor Co. (F)", label: "Ford Motor Co. (F)" },
  { value: "General Motors (GM)", label: "General Motors (GM)" },
  { value: "Honda Motor Co. Ltd. ( HMC)", label: "Honda Motor Co. Ltd. ( HMC)" },
  { value: "Tesla Motors (TSLA)", label: "Tesla Motors (TSLA)" },
];
const availabilityOption = [
  { value: "available", label: "Available" },
  { value: "not_available", label: "Not Available" }
];
const categoryOption = [
  { value: "Braking system", label: "Braking system" },
  { value: "Electrified powertrain components", label: "Electrified powertrain components" },
  { value: "Engine components and parts", label: "Engine components and parts" },
  { value: "Engine cooling system", label: "Engine cooling system" },
  { value: "Engine oil systems", label: "Engine oil systems" },
  { value: "Exhaust system", label: "Exhaust system" },
  { value: "Fuel supply system", label: "Fuel supply system" },
  { value: "Suspension and steering systems", label: "Suspension and steering systems" },

]

const UpdateAccessory = ({ accessoryData }: any) => {
  const ava = accessoryData.avatar;
  const [avatar, setAvatar] = useState(ava?ava:"");
  const [currentImage, setCurrentImage] = useState(avatar || "https://i.ibb.co/SRF75vM/avatar.png");
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
        .then(result => setAvatar(result?.data?.display_url))
  }
  const defaultValues = {
    accessory_name: accessoryData.accessory_name,
    availability:accessoryData.availability,
    avatar: accessoryData.avatar,
    category: accessoryData.category,
    expire_date:accessoryData.expire_date.substring(0,10),
    id: accessoryData.id,
    manufacturer: accessoryData.manufacturer,
    model: accessoryData.model,
    purchase_date: accessoryData.purchase_date.substring(0,10),
    qty_hand: accessoryData.qty_hand,
    status: accessoryData.status,
    unit_cost: accessoryData.unit_cost,
    vendor:accessoryData.vendor
  };

  const  [updateAccessoryFunction] =useUpdateAccessoryMutation(); 
 
// 
  const onSubmit: SubmitHandler<any> = async (data: any) => {
   
    try {
      data.purchase_date = new Date(data.purchase_date);
      data.expire_date = new Date(data.expire_date);
      data.unit_cost = Number(data.unit_cost);
      data.qty_hand = Number(data.qty_hand);
      data.avatar = avatar? avatar : "https://i.ibb.co/SRF75vM/avatar.png"; 
      const id = data.id;
      const res = await updateAccessoryFunction({ id, data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Accessory updated successfully");
      }
      // Success message
      // Close the modal
      // Optionally, you can trigger a refetch of the accessory data here
    } catch (error) {
      // Error message
      message.error("Failed to update accessory. Please try again later.");
      console.error("Update accessory error:", error);
    }
  };
  
  return (
    <>
    <p className="font-bold text-black text-[16px] mb-2">Update Accessory</p>
    <div className="mx-auto overflow-y-scroll ">
      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div className="flex lg:flex-row flex-col gap-4 justify-center lg:items-center mt-2 py-2">
            <div className="form-control w-full max-w-x flex items-center gap-2"
            >
              <div className="w-2/5">
                <div className="w-12 h-12 rounded-full">
                    <Image
                      src={currentImage}
                      alt='avatar'
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
            <FormInput
              name="accessory_name"
              type="text"
              size="large"
              placeholder="Accessory Name"
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="category"
              size="large"
              placeholder="Category"
              options={categoryOption}
            />
          </div>

          <div className="mb-4">
            <FormInput
              name="model"
              type="text"
              size="large"
              placeholder="Model"
            />
          </div>

          <div className="mb-4">
            <FormSelectField
              name="status"
              size="large"
              placeholder="Status"
              options={statusTypeOption}
            />
          </div>
          <div className="mb-4">
            <FormSelectField
              name="availability"
              size="large"
              placeholder="Availability"
              options={availabilityOption}
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="unit_cost"
              type="number"
              size="large"
              placeholder="Unit cost"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="qty_hand"
              type="number"
              size="large"
              placeholder="QTY on hand"
            />
          </div>
          <div className="mb-4">
            
            <FormSelectField
              name="vendor"
              size="large"
              placeholder="Vendor"
              options={vendorOption}
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="manufacturer"
              type="text"
              size="large"
              placeholder="Manufacturer"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="purchase_date"
              size="large"
              type="date"
              placeholder="purchase Date"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="expire_date"
              type="date"
              size="large"
              placeholder="Expire Date"
            />
          </div>
        <Button
          htmlType="submit"
          className="rounded-lg bg-secondary text-[#eee]"
        >
         Update Accessory
        </Button>
      </Form>
    </div>
  </>
  );
};

export default UpdateAccessory;
