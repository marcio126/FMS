"use client";
import Link from 'next/link';
import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { getUserInfoFromToken, storeUserInfo } from "@/services/auth.service";
import { Button, Tooltip, message } from "antd";
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
  const [userLogin, { isLoading: isLogin }] = useUserLoginMutation();

  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");

  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ email, password }).unwrap();
      if (res?.data?.accessToken) {
        const userInfo = await getUserInfoFromToken(res?.data?.accessToken);
        if (userInfo?.role === "MANAGER") {
          router.push("/manager/overview");
          message.success("Manager log in successful");
        } else if (userInfo?.role === "DRIVER") {
          router.push("/driver/overview");
          message.success("Driver log in successful");
        } else {
          router.push("/user/overview");
          message.success("User log in successful");
        }
      } else {
        message.error("Login not successful");
      }
      storeUserInfo({ accessToken: res?.data?.accessToken });
    } catch (err: any) {
      message.error("Login unsuccessful");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-stretch text-white ">
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center vms-login-page-banner">
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Fleet Management System
            </h1>
            {/* <p className="text-3xl my-4">Imagine having a virtual garage</p> */}
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
                marginTop: "5%",
                marginBottom: "5%",
              }}
            />

            <p className="text-gray-200 text-xl mb-12">
              Welcome our Vehicle Managment System Login Page
            </p>

            <Form submitHandler={onSubmit}>
              <div className={`flex flex-col justify-center items-center`}>
                <div className="w-[60%] ">
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
                <div className="w-[60%]">
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
                <div className="w-[60%] ">
                  {" "}
                  <button
                    type="submit"
                    className="uppercase block w-full rounded-lg !bg-brand  hover:!bg-gray-200 hover:!text-sky-600 transition-0.3s py-1
                  focus:outline-none"
                  >
                    {isLogin ? "Loading..." : "LogIn"}
                  </button>
                </div>
                <div className="m-[10px] flex gap-x-2">
                  You don't have account?
                  <Link href="register">
                    <Tooltip
                    title="Don't have account?"
                    color="geekblue"
                    key="geekblue"
                  >
                    <p className="cursor-pointer underline text-sky-600">
                      Register...
                    </p>
                  </Tooltip>
                  </Link>
                  
                </div>
                
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
