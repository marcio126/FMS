"use client";
import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useUserRegisterMutation } from "@/redux/api/authApi";
import Link from 'next/link';
import { Button, Tooltip, message } from "antd";
import {
  CameraOutlined
}
from "@ant-design/icons";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import logo from "../../assets/logo.png";
import { SetStateAction, useState } from "react";

type FormValues = {
  id: string;
  password: string;
  
};

export default function LoginPage() {
  const [userRegister] = useUserRegisterMutation();

    const [fullname, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("12345678");
    const [avatar, setAvater] = useState("");
    const [currentImage, setCurrentImage] = useState(avatar || "https://i.ibb.co/W5QpjZ7/avatar.png");
  const router = useRouter();
  const handleImageUpload = async (e : any) => {
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
        await fetch(`https://api.imgbb.com/1/upload?key=${imageStoragekey}`, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
      .then(result => setAvater(result?.data?.display_url))
    }
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
      try {
          let name = fullname;
          const formData = {
              name,
              phone,
              address,
              location,
              email,
              password,
              avatar
          }
          const res = await userRegister(formData);
            if ((res as any).data?.statusCode === 200) {
            message.success("User Created successful");
                router.push("login");
            } else {
            message.error("Something went wrong");
            }
    } catch (err: any) {
      message.error("Register unsuccessful");
    }
  };
  
  return (
    <>
      <div className="min-h-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center vms-login-page-banner">
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Fleet Management System (FMS)
            </h1>
            <p className="text-3xl my-4">Imagine having a virtual garage</p>
          </div>
        </div>

        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 "
          style={{ backgroundColor: "#00334E" }}
        >
          <div className="w-full py-1  ">
            <Image
              alt="Mountains"
              src={logo}
              sizes="100vw"
              style={{
                width: "35%",
                height: "auto",
                margin: "auto",
              }}
            />

            <p className="text-gray-200 text-xl mb-8">
              Welcome our Vehicle Managment System Register Page
            </p>

            <Form submitHandler={onSubmit}>
                <div className="w-[60%] mr-auto ml-auto mb-5">
                  <div className={`flex flex-col justify-center items-center`}>
                    <div className="flex items-center justify-center">
                        <div className="w-32 z-1 h-32 bg-red-500 rounded-full relative">
                          <Image
                            src={currentImage}
                            alt='avater'
                            className="w-full h-full
                            object-cover rounded-full"
                            width={0}
                            height={0}
                            unoptimized
                          />
                          <div className="absolute z-9 right-1  bottom-0 flex justify-center items-center ">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center">
                              <div className="flex flex-col items-start mt-2">
                                <label htmlFor="photo" className="flex items-center cursor-pointer bg-blue-200 hover:bg-gray-300 rounded-full p-2">
                                  <CameraOutlined/>
                                </label>
                                <input
                                  id="photo"
                                  type="file"
                                  name="avatar"
                                  className="hidden" // Hide the input element
                                  onChange={handleImageUpload}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
                <div className="w-[60%] mr-auto ml-auto">
                  <FormInput
                    name="fullname"
                    type="text"
                    size="large"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      return setFullName(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div className="w-[60%] mr-auto ml-auto">
                  <FormInput
                    name="phone"
                    type="tel"
                    size="large"
                    placeholder="phone number"
                    value={phone}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      return setPhone(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div className="w-[60%] mr-auto ml-auto">
                  <FormInput
                    name="address"
                    type="text"
                    size="large"
                    placeholder="address"
                    value={address}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      return setAddress(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div className="w-[60%] mr-auto ml-auto">
                  <FormInput
                    name="location"
                    type="text"
                    size="large"
                    placeholder="Location"
                    value={location}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      return setLocation(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div className="w-[60%] mr-auto ml-auto">
                  <FormInput
                    name="email"
                    type="email"
                    size="large"
                    placeholder="User Email"
                    value={email}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      return setEmail(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div className="w-[60%] mr-auto ml-auto">
                  <FormInput
                    name="password"
                    type="password"
                    size="large"
                    placeholder="User Password"
                    value={password}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => {
                      return setPassword(e.target.value);
                    }}
                  />
                </div>
                <br />
                <div className="w-[60%] mr-auto ml-auto">
                  {" "}
                  <button
                    type="submit"
                    className="uppercase block w-full rounded-lg !bg-brand  hover:!bg-gray-200 hover:!text-sky-600 transition-0.3s py-1
                  focus:outline-none"
                  >
                    {"Register"}
                  </button>
                </div>
                <div className="w-[60%] mt-4 m-auto flex justify-center gap-x-2">
                    You already have account?
                    <Link href="/login">
                    <Tooltip
                            title="You have account?"
                            color="geekblue"
                            key="geekblue"
                        >
                            <p className="cursor-pointer underline text-sky-600">
                            Login...
                            </p>
                        </Tooltip>
                    </Link>
                  
                </div>
              
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
