import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import {
  useUpdateSingleVehicleMutation,
  useGetSingleVehicleQuery,
} from "@/redux/api/vehecleApi";
import { Button, message } from "antd";
import { SubmitHandler } from "react-hook-form";

type AddVehicleValues = {
  license: string;
  brand: string;
  model: string;
  fuelType: string;
  seatCapacity: string;
};

const UpdateVehecleForm = ({ vehicleData }: any) => {
  
  const { vehicleName, vin_sn, brand, model, mileage, price, tax, id } = vehicleData;
  const [updateVehicle] = useUpdateSingleVehicleMutation();

  const defaultValues = {
    vehicleName: vehicleName,
    vin_sn: vin_sn,
    brand: brand,
    model: model,
    mileage: mileage,
    price: price,
    tax: tax,
  };

  const onSubmit: SubmitHandler<AddVehicleValues> = async (data: any) => {
    data.mileage = parseInt(data.mileage);
    data.price = parseInt(data.price);
    data.tax = parseInt(data.tax);
    //  data.registrationNo =  vehicle?.data?.registrationNo;
    // console.log(data, updateID)
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
              placeholder="Vehicle Model"
            />
          </div>

          <div className="mb-4">
            <FormInput
              name="mileage"
              type="text"
              size="large"
              placeholder="Vehicle Mileage"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="price"
              type="text"
              size="large"
              placeholder="Vehicle Price"
            />
          </div>
          <div className="mb-4">
            <FormInput
              name="tax"
              type="text"
              size="large"
              placeholder="Vehicle Tax"
            />
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
