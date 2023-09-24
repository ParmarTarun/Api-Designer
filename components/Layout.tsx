import { ReactChildrenProps } from "@/types";
import SideBar from "./SideBar";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { useState } from "react";

const Layout = ({ children }: ReactChildrenProps) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="bg-secondary h-screen">
      <div className="flex">
        <SideBar showNav={showNav} setShowNav={setShowNav} />
        <div className="w-full flex flex-col">
          <div className="w-full bg-primary text-secondary text-2xl flex items-center lg:hidden md:hidden sm:block">
            <button onClick={() => setShowNav(!showNav)} className=" p-6 ">
              <RiMenuUnfoldFill />
            </button>
            <h2 className="">API Designer</h2>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
