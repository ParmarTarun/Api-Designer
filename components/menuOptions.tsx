import { menuOption } from "@/types";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdClose } from "react-icons/md";

interface menuOptionsProps {
  options: menuOption[];
  id: string;
}

const MenuOptions = ({ id, options }: menuOptionsProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  // add close option to options
  const menuOptions = [
    ...options,
    {
      name: "Close",
      icon: <MdClose />,
      callback: () => setOpenMenu(false),
    },
  ];
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenMenu(!openMenu);
  };

  const handleOptionClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    ind: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    menuOptions[ind].callback(id);
    setOpenMenu(false);
  };

  return (
    <div className=" flex flex-col justify-center items-center">
      <button
        className="text-xl flex justify-center items-center pl-4 py-2 pr-2"
        onClick={toggleMenu}
      >
        <CiMenuKebab />
      </button>
      <div>
        {openMenu && (
          <div className="absolute bg-darkHighlight text-secondary shadow-md rounded-md">
            {menuOptions.map((op, i) => (
              <div
                className={`hover:bg-primary ${
                  i === menuOptions.length - 1 ? "bg-primary bg-opacity-50" : ""
                }`}
                key={i}
              >
                <button
                  className="flex items-center gap-2 px-2 py-2"
                  onClick={(e) => handleOptionClick(e, i)}
                >
                  {op.icon}
                  <span>{op.name}</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuOptions;
