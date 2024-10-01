"use client";
import Form from "@/components/ReusableForms/Form";
import FormInput from "@/components/ReusableForms/FormInput";
import {
  CameraOutlined,
  EditOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  MailFilled,
  PhoneOutlined,
  TwitterSquareFilled,
  UserAddOutlined,
  KeyOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Divider, Menu, message } from "antd";
import Image from "next/image";
import React, { useState,useEffect, SetStateAction } from "react";
import { SubmitHandler } from "react-hook-form";
import { useGetProfileQuery,useProfileUpdateMutation } from "@/redux/api/authApi";
import { getTokenFromKey } from "@/services/auth.service";

type MenuItem = Required<MenuProps>["items"][number];
type FormValues = {
  id: string;
  password: string;
  
};
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("Edit Profile", "edit-profile", <EditOutlined />),
  getItem("Social Profile", "social-profile", <UserAddOutlined />),
];

const UserProfile = ()  => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(
    "edit-profile"
  );
  const [profileUpdate] = useProfileUpdateMutation();
    const userInfo = getTokenFromKey();
    const { data: getProfile } = useGetProfileQuery(userInfo?.id);
    const [userProfile, setUserProfile] = useState<any>({});
    const [fullname, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [avatar, setAvater] = useState("");
  const [currentImage, setCurrentImage] = useState(avatar || "https://i.ibb.co/W5QpjZ7/avatar.png");
  const [new_password, setNewPassword] = useState("");
  const [new_repassword, setNewRePassword] = useState("");
    useEffect(() => {
    if (getProfile != undefined) {
      setUserProfile(getProfile.data);
      setAvater(getProfile.data.avatar); // Set the avatar state
      setCurrentImage(getProfile.data.avatar); // Set the currentImage state
      }
    }, [getProfile]);
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
    .then(result => setAvater(result?.data?.display_url));
    message.success("Changed Profile Photo");
  }
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      data.name = fullname != "" ? fullname : data.name;
      data.phone = phone != "" ? phone : data.phone;
      data.address = address != "" ? address : data.address;
      data.location = location != "" ? location : data.location;
      data.avatar = avatar != "" ? avatar : data.avatar;
      if(new_password!="" || new_repassword !=""){
        if (new_password == new_repassword) {
          data.newpassword = new_password;
        }
        else {
          message.error("Didn't match password!");
        }
      }
      else{
        data.newpassword = "";
      }
      let id = data.id;
      
      const res = await profileUpdate({id, ...data});
        if ((res as any).data?.statusCode === 200) {
        message.success("User Profile Update successful");
        } else {
        message.error("Something went wrong");
        }
    } catch (err: any) {
      message.error("Update profile unsuccessful");
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-textColor">My Profile</h1>
        <Form  submitHandler={onSubmit} defaultValues = {userProfile}>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="bg-white dark:bg-[#00334E] w-full md:w-72 px-4 py-8 rounded">
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
          <div className="text-center my-6 dark:text-[#EFEFEF]">
            <h1 className="text-lg font-semibold ">{userProfile.name}</h1>
            <p className="font-light">{userProfile.email}</p>
          </div>
          <Divider style={{ backgroundColor: "#eee" }} />
          <div>
            <Menu
              onClick={(e) => setSelectedMenuItem(e.key)}
              style={{ width: 230 }}
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="vertical"
              items={items}
              className="dark:bg-[#00334E] dark:text-[#EFEFEF] "
            />
          </div>
        </div>
        <div className="bg-white dark:bg-[#00334E]  w-full md:flex-1 px-4 py-8 rounded">
          {selectedMenuItem === "edit-profile" && (
            <div className="dark:text-[#EFEFEF]">
              <h1 className="text-xl font-semibold">Edit Profile</h1>
              <p className="text-sm">set up your personal information</p>
              <Divider style={{ backgroundColor: "#eee" }} />

              <div className="w-full md:w-3/5 md:mx-auto">
                
                  <div className="space-y-4">
                    <div>
                      <FormInput
                      name="name"
                      type="text"
                      label="Name"
                      size="large"
                      placeholder="Full Name"
                      value={fullname}
                      prefix={<UserAddOutlined />}
                      onChange={(e: {
                        target: { value: SetStateAction<string> };
                      }) => {
                        return setFullName(e.target.value);
                      }}
                  />
                    </div>
                    <div>
                      <FormInput
                        name="phone"
                        type="tel"
                        size="large"
                        label="Phone Number"
                        placeholder="Phone Number (+880 ...)"
                        prefix={<PhoneOutlined />}
                        value={phone}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => {
                          return setPhone(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <FormInput
                        name="address"
                        type="text"
                        size="large"
                        label="Address"
                        placeholder="address"
                        value={address}
                        prefix={<EnvironmentOutlined />}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => {
                          return setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <FormInput
                        name="location"
                        type="text"
                        size="large"
                        label="Location"
                        placeholder="Location"
                        prefix={<EnvironmentOutlined />}
                        value={location}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => {
                          return setLocation(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <FormInput
                        name="new_password"
                        type="password"
                        label="Password"
                        size="large"
                        placeholder="Password"
                        value={new_password}
                        prefix={<KeyOutlined />}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => {
                          return setNewPassword(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <FormInput
                        name="new_password_reenter"
                        type="password"
                        label="Reender Password"
                        size="large"
                        placeholder="Reenter"
                        value={new_repassword}
                        prefix={<KeyOutlined />}
                        onChange={(e: {
                          target: { value: SetStateAction<string> };
                        }) => {
                          return setNewRePassword(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                  className="uppercase block w-full rounded-lg !bg-[#003343] text-[#eee]  hover:!bg-gray-200 hover:!text-sky-600 transition-0.3s py-1
                  focus:outline-none dark:bg-gray-100 dark:text-[#00334E] mt-3"
                  >
                    Update Profile
                  </button>
              </div>
            </div>
          )}
          {selectedMenuItem === "social-profile" && (
            <div className="dark:text-[#EFEFEF]">
              <h1 className="text-xl font-semibold">Social Profile</h1>
              <p className="font-extralight text-sm">
                Add elsewhere links to your profile
              </p>
              <Divider style={{ backgroundColor: "#eee" }} />
              <div className="w-full md:w-3/5 md:mx-auto">
                <Form submitHandler={onSubmit}>
                  <div className="space-y-4">
                    <div>
                      <FormInput
                        name="facebook_url"
                        type="url"
                        size="large"
                        label="Facebook :"
                        placeholder="Facebook URL"
                        prefix={
                          <FacebookFilled className="text-2xl bg-[#00334E] text-white outline-none border-none" />
                        }
                      />
                    </div>
                    <div>
                      <FormInput
                        name="twitter_url"
                        type="url"
                        size="large"
                        label="Twitter :"
                        placeholder="Twitter URL"
                        prefix={
                          <TwitterSquareFilled className="text-2xl bg-[#00334E] text-white outline-none border-none" />
                        }
                      />
                    </div>
                  </div>
                  <Button
                    shape="default"
                    type="primary"
                    htmlType="submit"
                    className="bg-[#003343] text-[#eee] dark:bg-gray-100 dark:text-[#00334E] mt-3"
                  >
                    Update Social Profile
                  </Button>
                </Form>
              </div>
            </div>
          )}
          
      </div>
      </div>
      </Form>
    </div>
  );
};

export default UserProfile;
