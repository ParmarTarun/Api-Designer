import { ReactChildrenProps } from "@/types";
import SideBar from "./SideBar";

const Layout = ({ children }: ReactChildrenProps) => {
  return (
    <div className="h-screen bg-secondary grid grid-cols-8">
      <div className="col-span-1 min-h-screen bg-primary">
        <SideBar />
      </div>
      <div className=" p-4">{children}</div>
    </div>
  );
};

export default Layout;
