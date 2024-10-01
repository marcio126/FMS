import {
  AppstoreAddOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  CarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  FileZipOutlined,
  IdcardOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  SafetyOutlined,
  ScheduleOutlined,
  ShopOutlined,
  SubnodeOutlined,
  TruckOutlined,
  UserOutlined,
  SettingOutlined,
  ToolOutlined,
  SelectOutlined,
  SyncOutlined,
  FireOutlined,
  DropboxOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FundViewOutlined,
  GlobalOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const privacyPolicySidebarItem: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/privacy`}>Privacy Policy</Link>,
      icon: <SafetyOutlined />,
      key: `/privacy`,
    },
  ];
  const faqSidebarItem: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/faq`}>FAQ</Link>,
      icon: <QuestionCircleOutlined />,
      key: `/${role}/faq`,
    },
  ];

  const contactSidebarItem: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/contact`}>Contact</Link>,
      icon: <PhoneOutlined />,
      key: `/${role}/contact`,
    },
  ];

  const profileSidebarItem: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/profile`}>Profile</Link>,
      icon: <UserOutlined />,
      key: `/${role}/profile`,
    },
  ];

  const overviewSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/overview`}>Overview</Link>,
      icon: <AreaChartOutlined />,
      key: `/${role}/overview`,
    },
  ];

  //.............Manager.......................
  const managerSidebarItems: MenuProps["items"] = [
    ...overviewSidebarItems,
    {
      label: "User Management",
      key: "User Management",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={`/${role}/driver`}>Driver</Link>,
          icon: <CarOutlined />,
          key: `/${role}/driver`,
        },
        {
          label: <Link href={`/${role}/user`}>User(Manager)</Link>,
          icon: <UserOutlined />,
          key: `/${role}/user`
        },
        {
          label: <Link href={`/${role}/customer`}>Customer</Link>,
          icon: <IdcardOutlined />,
          key: `/${role}/customer`
        }
      ],
    },
    {
      label:"Vehicle Management",
      key: "Vehicle Management",
      icon:<TruckOutlined />,
      children:[
        {
          label: <Link href={`/${role}/vehicle`}>Vehicles</Link>,
          icon: <TruckOutlined />,
          key: `/${role}/vehicle`,
        },
        {
          label: <Link href={`/${role}/vehicleType`}>Vehicles Type</Link>,
          icon: <CarOutlined />,
          key: `/${role}/vehicleType`,
        },
        {
          label: <Link href={`/${role}/vehicleInspection`}>Vehicle Inspection</Link>,
          icon: <BarChartOutlined />,
          key: `/${role}/vehicleInspection`,
        },
        {
          label: <Link href={`/${role}/vehicleTrack`}>Vehicle Track</Link>,
          icon: <EnvironmentOutlined />,
          key: `/${role}/vehicleTrack`,
        },
      ]
    },
    {
      label: <Link href={`/${role}/trip`}>Trip</Link>,
      icon: <EnvironmentOutlined />,
      key: `/${role}/trip`,
    },
    {
      label: <Link href={`/${role}/manageFuel`}>Manage Fuel</Link>,
      icon: <ExperimentOutlined />,
      key: `/${role}/manageFuel`,
    },
    // {
    //   label: <Link href={`/${role}/inventory`}>Inventory</Link>,
    //   icon: <ShopOutlined />,
    //   key: `/${role}/inventory`,
    // },
    {
      label: <Link href={`/${role}/vendors`}>Vendors</Link>,
      icon: <ShopOutlined />,
      key: `/${role}/vendors`,
    },
    {
      label: <Link href={`/${role}/managePart`}>Manage Parts</Link>,
      icon: <SettingOutlined />,
      key: `/${role}/managePart`,
    },
    {
      label: "Expenses",
      key: "expenses",
      icon: <DollarOutlined />,
      children: [
        // {
        //   label: <Link href={`/${role}/trip-cost`}>Trip-Cost</Link>,
        //   key: "Trip Cost",
        // },
        {
          label: <Link href={`/${role}/salary`}>Salary</Link>,
          icon: <DollarOutlined />,
          key: "Salary",
        },
        {
          label: <Link href={`/${role}/office-cost`}>Office-Cost</Link>,
          icon: <DollarOutlined />,
          key: "Office Cost",
        },
        {
          label: <Link href={`/${role}/accessories`}>Accessories</Link>,
          icon: <DollarOutlined />,
          key: "Accessories",
        },
      ],
    },
    {
      label: <Link href={`/${role}/order`}>Orders</Link>,
      icon: <ToolOutlined />,
      key: `/${role}/order`,
    },
    // {
    //   label: <Link href={`/${role}/manageRequest`}>Manage Request</Link>,
    //   icon: <SubnodeOutlined />,
    //   key: `/${role}/manageRequest`,
    // },
    {
      label: <Link href={`/${role}/report`}>Report and Analysis</Link>,
      icon: <FileZipOutlined />,
      key: `/${role}/ReportAnalysis`,
    },
    {
      label: <Link href={`/${role}/review`}>Review</Link>,
      icon: <SelectOutlined />,
      key: `/review`,
    },
    // {
    //   label: <Link href={`/driver/inventoryRequest`}>Inventory Request</Link>,
    //   // label: <Link href={`/${role}/inventoryRequest`}>Inventory Request</Link>,
    //   icon: <ShopOutlined />,
    //   key: `/${role}/inventoryRequest`,
    // },
     {
      label: <Link href={`/${role}/roleManage`}>Role Manage</Link>,
      // label: <Link href={`/${role}/roleManage`}>Role Manage</Link>,
      icon: <AppstoreAddOutlined />,
      key: `/${role}/roleManage`,
    },
    ...contactSidebarItem,
    ...privacyPolicySidebarItem,
    ...faqSidebarItem,
    ...profileSidebarItem,
  ];

  //.........Driver........................
  const driverSidebarItems: MenuProps["items"] = [
    ...overviewSidebarItems,
    
    // {
    //   label: "Trip Schedule",
    //   key: "tripSchedule",
    //   icon: <ScheduleOutlined />,
    //   children: [
    //     {
    //       label: <Link href={`/${role}/upComingTrip`}>Upcoming Trip</Link>,
    //       icon: <ScheduleOutlined />,
    //       key: "upComingTrip",
    //     },
    //     {
    //       label: <Link href={`/${role}/tripHistory`}>Trip History</Link>,
    //       icon: <ScheduleOutlined />,
    //       key: "tripHistory",
    //     },
    //   ],
    // },
    {
      label: <Link href={`/${role}/driverVehicleInspection`}>Veicle Inspection</Link>,
      icon:<SyncOutlined />,
      key: "driverVehicleInspection",
    },
    {
      label: <Link href={`/${role}/driverManageFuel`}>Manage Fuel</Link>,
      icon:<FireOutlined />,
      key: "driverManageFuel",
    },
    {
      label: <Link href={`/${role}/income`}>Manage Income</Link>,
      icon:<DollarOutlined />,
      key: "income",
    },
    {
      label: <Link href={`/${role}/expense`}>Manage Expense</Link>,
      icon:<DropboxOutlined />,
      key: "expense",
    },
      {
        label: <Link href={`/${role}/mybook`}>My booking</Link>,
        icon:<FileDoneOutlined />,
        key: "mybook",
    },
    {
      label: <Link href={`/manager/review`}>Review</Link>,
      icon: <FileSearchOutlined />,
      key: `/review`,
    },
    {
      label: <Link href={`/${role}/inventoryRequest`}>Inventory Request</Link>,
      icon: <ShopOutlined />,
      key: `/${role}/inventoryRequest`,
    },
    ...contactSidebarItem,
    ...faqSidebarItem,
    ...privacyPolicySidebarItem,
    ...profileSidebarItem,

  ];

  const userSidebarItems: MenuProps['items'] = [
    ...overviewSidebarItems,
    {
      label: <Link href={`/${role}/provider`}>Provider</Link>,
      // label: <Link href={`/driver/addTrip`}>Add Trip</Link>,
      icon:<FundViewOutlined />,
      key: `/${role}/provider`,
    },
    {
      label: <Link href={`/${role}/addTrip`}>Add Trip</Link>,
      // label: <Link href={`/driver/addTrip`}>Add Trip</Link>,
      icon:<GlobalOutlined />,
      key: `/${role}/addTrip`,
    },
    {
      // label: <Link href={`/${role}/upComingTrip`}>Upcoming Trip</Link>,
      label: <Link href={`/${role}/upComingTrip`}>Upcoming Trip</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/upComingTrip`,
    },
    {
      // label: <Link href={`/${role}/tripHistory`}>Trip History</Link>,
      label: <Link href={`/${role}/tripHistory`}>Trip History</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/tripHistory`,
    },
    {
      label: <Link href={`/manager/review`}>Review</Link>,
      icon: <FileSearchOutlined />,
      key: `/review`,
    },
    ...contactSidebarItem,
    ...privacyPolicySidebarItem,
    ...faqSidebarItem,
    ...profileSidebarItem,
  ]
  if (role === USER_ROLE.USER) return userSidebarItems;
  else if (role === USER_ROLE.MANAGER) return managerSidebarItems;
  else if (role === USER_ROLE.DRIVER) return driverSidebarItems;
  else {
    privacyPolicySidebarItem;
  }
};
