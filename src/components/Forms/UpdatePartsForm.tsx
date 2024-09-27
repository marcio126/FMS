import { useEffect, useState } from 'react';
import Image from "next/image";
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";
import Form from "../ReusableForms/Form";
import FormInput from "../ReusableForms/FormInput";
import { useGetAllListVendorsQuery } from "@/redux/api/vendorsApi";
import { useUpdatePartsMutation } from "@/redux/api/partsApi";
import FormSelectField from '../ReusableForms/FormSelectField';

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
const UpdatePartsForm = ({ partsData }: any) => { 
  const { avatar, name, reg_number, description, status, available, vendor, category, manufacturer, year, model, unit_cost, note, qty_hand, id } = partsData;

  const defaultValues = {
    name: name,
    reg_number:reg_number,
    description: description,
    status: status,
    avatar: avatar,
    available: available==true?"Available":"not Available",
    vendor: vendor,
    category: category,
    manufacturer: manufacturer,
    year: year,
    model: model,
    note: note,
    unit_cost: unit_cost,
    qty_hand:qty_hand
  };
  const [avater, setAvater] = useState(avatar?avatar:"");
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
  
  useEffect(() => {
  if (vendors?.data) {
          const options = vendors.data.map((vendor: { name: any }) => ({
              label: vendor.name,
              value: vendor.name
          }));
          setVendorOptions(options);
      }
  }, [vendors]);
  
  const [updateParts] = useUpdatePartsMutation();
  const onSubmit: SubmitHandler<AddPartsValues> = async (data: any) => {
    data.id = id;
    data.avatar = avater?avater : "https://i.ibb.co/SRF75vM/avatar.png";
    data.reg_number = parseInt(data.reg_number);
    data.available = data.available == "Available" ? true : false;
    data.year = parseInt(data.year);
    data.qty_hand = parseInt(data.qty_hand);
    data.unit_cost = parseInt(data.unit_cost);
    try {
      const res = await updateParts({id, ...data });
      if ((res as any)?.data?.statusCode === 200) {
        message.success("Parts updated successfully");
      }
    } catch (error) {
      console.log("Parts update error", error);
    }
  };
  return (
    <>
      <div className="mx-auto overflow-y-scroll p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdatePartsForm;
