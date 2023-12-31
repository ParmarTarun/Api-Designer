import { ReactChildrenProps } from "@/types";
import React from "react";

const Header = ({ children }: ReactChildrenProps) => {
  return (
    <div className="mt-2 mb-4">
      <div className="bg-primary rounded-md text-secondary font-semibold w-full px-4 py-2">
        {children}
      </div>
    </div>
  );
};

export default Header;
