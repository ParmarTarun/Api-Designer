import Link from "next/link";
import React from "react";
import { RiSettingsFill, RiUser3Fill, RiDashboardFill } from "react-icons/ri";
const SideBar = () => {
  return (
    <div className="h-full text-secondary p-10 flex flex-col justify-between">
      <div className="upper-section">
        <Link href={"/"} className="logo">
          <h2 className="text-4xl">API</h2>
          <h5 className="text-2xl">Designer</h5>
        </Link>
        <div className="border-b border-secondary mt-2"></div>
        <div className="mt-4">
          <Link href={"/dashboard"} className="text-lg flex items-center">
            <RiDashboardFill className="mr-2" />
            Dashboard
          </Link>
        </div>
      </div>
      <div className="lower-section">
        <Link href={"/profile"} className="text-lg flex items-center">
          <RiUser3Fill className="mr-2" />
          Profile
        </Link>
        <Link href={"/settings"} className="text-lg flex items-center">
          <RiSettingsFill className="mr-2" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
