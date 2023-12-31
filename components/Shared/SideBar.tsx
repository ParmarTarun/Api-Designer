import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  RiSettingsFill,
  RiUser3Fill,
  RiDashboardFill,
  RiMenuFoldFill,
} from "react-icons/ri";
import { BiSolidCollection } from "react-icons/bi";
import { useRouter } from "next/router";

interface SideBarProps {
  showNav: boolean;
  setShowNav: (p: boolean) => void;
}

const SideBar = ({ showNav, setShowNav }: SideBarProps) => {
  const fda = useRouter();
  const logout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  const page = fda.pathname.split("/")[1];
  return (
    <aside
      className={
        (showNav ? "left-0" : "-left-full") +
        " h-full text-secondary p-6 flex flex-col justify-between bg-primary fixed w-full md:static md:w-1/5 md:min-h-screen transition-all delay-300"
      }
    >
      <div>
        <button
          onClick={() => setShowNav(!showNav)}
          className="md:hidden absolute right-10 text-2xl"
        >
          <RiMenuFoldFill />
        </button>
        <div className="upper-section">
          <Link href={"/"} className="logo">
            <h2 className="text-4xl">API</h2>
            <h5 className="text-2xl">Designer</h5>
          </Link>
          <div className="border-b border-secondary mt-2"></div>
          <div className="mt-4">
            <Link
              href={"/dashboard"}
              className={`text-lg flex items-center ${
                page === "dashboard" && "font-semibold"
              }`}
            >
              <RiDashboardFill className="mr-2" />
              Dashboard
            </Link>
            <Link
              href={"/collections"}
              className={`text-lg flex items-center ${
                page === "collections" && "font-semibold"
              }`}
            >
              <BiSolidCollection className="mr-2" />
              Collections
            </Link>
          </div>
        </div>
      </div>
      <div className="lower-section">
        <Link
          href={"/profile"}
          className={`text-lg flex items-center ${
            page === "profile" && "font-semibold"
          }`}
        >
          <RiUser3Fill className="mr-2" />
          Profile
        </Link>
        <Link
          href={"/settings"}
          className={`text-lg flex items-center ${
            page === "settings" && "font-semibold"
          }`}
        >
          <RiSettingsFill className="mr-2" />
          Settings
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
