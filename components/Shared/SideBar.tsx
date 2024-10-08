import Link from "next/link";
import React from "react";
import {
  RiUser3Fill,
  RiMenuFoldFill,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { GoPasskeyFill } from "react-icons/go";
import { BiSolidCollection } from "react-icons/bi";
import { useRouter } from "next/router";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

interface SideBarProps {
  showNav: boolean;
  setShowNav: (p: boolean) => void;
}

const SideBar = ({ showNav, setShowNav }: SideBarProps) => {
  const fda = useRouter();
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
          <SignedIn>
            <div className="mt-4">
              {/* <Link
                href={"/dashboard"}
                className={`text-lg flex items-center ${
                  page === "dashboard" && "font-semibold"
                }`}
              >
                <RiDashboardFill className="mr-2" />
                Dashboard
              </Link> */}
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
          </SignedIn>
          <SignedOut>
            <div className="mt-4">
              <SignInButton>
                <button className="btn-unstyled">
                  <GoPasskeyFill className="mr-2 inline" />
                  Login
                </button>
              </SignInButton>
            </div>
          </SignedOut>
        </div>
      </div>
      <div className="lower-section">
        <SignedIn>
          {/* <Link
            href={"/profile"}
            className={`text-lg flex items-center ${
              page === "profile" && "font-semibold"
            }`}
          >
            <RiUser3Fill className="mr-2" />
            Profile
          </Link> */}
          {/* <Link
            href={"/settings"}
            className={`text-lg flex items-center ${
              page === "settings" && "font-semibold"
            }`}
          >
            <RiSettingsFill className="mr-2" />
            Settings
          </Link> */}
          {/* <button className="text-lg flex items-center">
            <RiLogoutCircleLine className="mr-2" />
            Logout
          </button> */}
        </SignedIn>
      </div>
    </aside>
  );
};

export default SideBar;
