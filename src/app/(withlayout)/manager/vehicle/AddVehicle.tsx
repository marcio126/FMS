"use client";

import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import FormSelectField from "@/components/ReusableForms/FormSelectField";
import { useCreateVehicleMutation } from "@/redux/api/vehecleApi";
import { useVehicleTypeQuery } from "@/redux/api/vehicleTypeApi";
import { formatDate } from "@/utils/formateDate";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
type AddVehicleValues = {
  license: string;
  brand: string;
  model: string;
  fuelType: string;
  seatCapacity: string;
};
const AddVehicle = () => {
  const { data: allVehicleType } = useVehicleTypeQuery({});
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    if (allVehicleType?.data) {
            const options = allVehicleType.data.map((vehicletype: { display_name: any  }) => ({
                label: vehicletype.display_name,
                value: vehicletype.display_name
            }));
            setVehicleTypeOptions(options);
        }
  }, [allVehicleType]);
  const [createVehicle] = useCreateVehicleMutation();
  const onSubmit: SubmitHandler<AddVehicleValues> = async (data: any) => {
    const vehicleName = data.VehicleName;
    const vin_sn = data.VIN;
    const brand = data.brand;
    const model = data.model;
    const registrationDate = formatDate(data.registrationDate);
    const vehicleType = data.vehicleType;
    const fuelType = data.fuelType;
    const mileage = Number(data.mileage);
    const price = Number(data.price);
    const tax = Number(data.tax);


    const formData = {
      vehicleName,
      vin_sn,
      brand,
      model,
      registrationDate,
      vehicleType, 
      fuelType,
      mileage,
      price,
      tax,
    };

    const resData = await createVehicle(formData);
    if ((resData as any).data?.statusCode === 200) {
      message.success("Vehicle Created successful");
    } else {
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <p className="font-bold text-black text-[16px] mb-2">Add Vehicle</p>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit}>
          <div className="mb-4">
            <FormInput
              name="VehicleName"
              type="text"
              size="large"
              placeholder="Vehicle Name"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="VIN"
              type="text"
              size="large"
              placeholder="VIN/SN"
            />
          </div>          
          <div className="md:flex md:gap-4 md:items-center ">
            <div className="mb-4">
              <FormInput
                name="brand"
                type="text"
                size="large"
                placeholder="Vehicle Brand"
              />
            </div>

            <div className="mb-4">
              <FormInput
                name="model"
                type="text"
                size="large"
                placeholder="Vehicle model"
              />
            </div>
          </div>

          <p className="mb-4">Registration:</p>
          <div className="mb-4">
            <FormInput
              name="registrationDate"
              size="large"
              type="date"
              placeholder="Registration Date"
            />
          </div>

          <div className="mb-4 flex justify-between">
            <span className="p-1">Vehicle Type:</span>
            <FormSelectField
              name="vehicleType"
              size="large"
              placeholder="Select Vehicle Type"
              options={vehicleTypeOptions}
            />
          </div>

          <div className="mb-4 flex justify-between gap-1">
            <span className="p-1">Fuel Type:</span>
            <div className="flex">
              <FormInput
                name="fuelType"
                type="radio"
                size="large"
                value="Petrol"
                id="petrol"
              />
              <label htmlFor="petrol" className="p-1">
                Petrol
              </label>
            </div>

            <div className="flex">
              <FormInput
                name="fuelType"
                type="radio"
                size="large"
                value="Diesel"
                id="diesel"
              />
              <label htmlFor="diesel" className="p-1">
                Diesel
              </label>
            </div>

            <div className="flex">
              <FormInput
                name="fuelType"
                type="radio"
                size="large"
                value="Electric"
                id="electric"
              />
              <label htmlFor="electric" className="p-1">
                Electric
              </label>
            </div>

            <div className="flex">
              <FormInput
                name="fuelType"
                type="radio"
                size="large"
                value="Hybrid"
                id="hybrid"
              />
              <label htmlFor="hybrid" className="p-1">
                Hybrid
              </label>
            </div>
          </div>          
          {/* <div className="mb-4">
            <FormInput
              name="color"
              type="text"
              size="large"
              placeholder="Vehicle Color"
            />
          </div> */}

          <div className="mb-4">
            <FormInput
              name="mileage"
              type="number"
              size="large"
              placeholder="Mileage"
            />
          </div>
          <div className="md:flex md:gap-4 md:items-center">
            <div className="mb-4">
              <FormInput
                name="price"
                type="number"
                size="large"
                placeholder="Vehicle Price"
              />
            </div>

            <div className="mb-4">
              <FormInput
                name="tax"
                type="number"
                size="large"
                placeholder="Vehicle Tax"
              />
            </div>
          </div>

          {/* <div className="mb-4">
            <FormInput
              name="seatCapacity"
              type="number"
              size="large"
              placeholder="Vehicle SeatCapacity"
            />
          </div> */}



          <Button
            htmlType="submit"
            className="rounded-lg bg-secondary text-[#eee]"
          >
            Add Vehicle
          </Button>
        </Form>
      </div>
    </>
  );
};

export default AddVehicle;
