"use client";
import { authKey } from "@/constants/storageKey";
import ThemeSwitcher from "@/helpers/ThemeSwitcher/ThemeSwitcher";
import { getUserInfo, getUserInfoFromToken, removeUserInfo } from "@/services/auth.service";
import { LogoutOutlined, UserOutlined,MoonOutlined,SunOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space, Switch } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const { role } = getUserInfo() as any;
  
  // const userRole = USER_ROLE;
  
  // const { role } = getUserInfo() as any;

  const router = useRouter();
  // logout function..................
  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };
  const profile = () => {
    router.push("/manager/profile");
  }
  //dropdown items.......................
  const items: MenuProps["items"] = [
    {
      key: `profile`,
      label: (
        <Button onClick={profile} type="text">
          <span className="ml-1"> Profile</span>
      </Button>
      ),
    },

    {
      key: "2",
      label: (
        <Button onClick={logOut} type="text" danger>
          <LogoutOutlined />
          <span className="ml-1"> Logout</span>
        </Button>
      ),
    },
  ];

  // nav color change..................
  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 60) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeColor);
  }

  return (
    <nav
      className={`${
        color ? "bg-white shadow-lg" : "shadow-sm bg-white"
      } sticky top-0 flex flex-wrap
          justify-end
          pr-12
          text-lg z-50 dark:bg-[#00334E]`}
    >
      <div className="w-auto">

        {/* <ul className="gap-x-5 py-3 flex flex-row justify-center items-center">
          <li> */}

        <ul className="gap-x-5 py-3 flex">
          {/* <li>
            <a className="text-base text-secondary block" href="#">
              <Space direction="vertical">
                <Switch
                  checkedChildren="বাংলা"
                  unCheckedChildren="EN"
                  defaultChecked
                />
              </Space>
            </a>
          </li> */}
          <li>
            <ThemeSwitcher />
          </li>
          <li>
            <a className="text-base text-secondary block" href="#">
              <Dropdown
                menu={{ items }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
              >
                <Avatar size="large" icon={<UserOutlined />} />
              </Dropdown>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
