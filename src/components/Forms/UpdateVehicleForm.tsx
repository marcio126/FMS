import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import {
  useUpdateSingleVehicleMutation,
} from "@/redux/api/vehecleApi";
import { useVehicleTypeQuery } from "@/redux/api/vehicleTypeApi";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import FormSelectField from "../ReusableForms/FormSelectField";

type AddVehicleValues = {
  license: string;
  brand: string;
  model: string;
  fuelType: string;
  seatCapacity: string;
};

const UpdateVehecleForm = ({ vehicleData }: any) => {
  
  const { vehicleName, vin_sn, brand, model, mileage, price, tax, id,registrationDate,vehicleType,fuelType } = vehicleData;
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
  const [updateVehicle] = useUpdateSingleVehicleMutation();
  const registration = registrationDate.substring(0,10);
  const defaultValues = {
      vehicleName:vehicleName,
      vin_sn:vin_sn,
      brand:brand,
      model:model,
      registrationDate:registration,
      vehicleType:vehicleType, 
      fuelType:fuelType,
      mileage:mileage,
      price:price,
      tax:tax,
  };

  const onSubmit: SubmitHandler<AddVehicleValues> = async (data: any) => {
    data.brand = data.brand;
    data.model = data.model;
    data.registrationDate = new Date(data.registrationDate);
    data.vehicleType = data.vehicleType;
    data.fuelType = data.fuelType;
    data.mileage = Number(data.mileage);
    data.price = Number(data.price);
    data.tax = Number(data.tax);
    const res = await updateVehicle({ id, ...data });
    if ((res as any)?.data?.statusCode === 200) {
      message.success("Vehicle updated successfully");
    }
  };

  return (
    <>
      <div className="mx-auto overflow-y-scroll ">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div className="mb-4">
            <FormInput
              name="vehicleName"
              type="text"
              size="large"
              placeholder="Vehicle Name"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="vin_sn"
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

          <Button
            htmlType="submit"
            className="uppercase text-md rounded-lg bg-brand hover:bg-gray-200 hover:text-secondary"
          >
            Update Vehicle
          </Button>
        </Form>
      </div>
    </>
  );
};

export default UpdateVehecleForm;
