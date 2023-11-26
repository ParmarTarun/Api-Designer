import { collectionType } from "@/models/Collection";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { MdClose, MdDelete, MdModeEdit } from "react-icons/md";

interface collectionMenuOptionsProps {
  coll: collectionType;
  handleDelete: (coll: string) => void;
  handleEdit: (coll: collectionType) => void;
}

const CollectionMenuOptions = ({
  coll,
  handleEdit,
  handleDelete,
}: collectionMenuOptionsProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuOptions = [
    {
      name: "Edit",
      icon: <MdModeEdit />,
      callback: async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleEdit(coll);
      },
    },
    {
      name: "Delete",
      icon: <MdDelete className="text-error" />,
      callback: async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleDelete(coll.id);
      },
    },
    {
      name: "Close",
      icon: <MdClose />,
      callback: async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
      },
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
    menuOptions[ind].callback(e).then(() => setOpenMenu(false));
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

export default CollectionMenuOptions;

{
  /* <button onClick={(e) => handleEdit(e, coll)}>
    <MdModeEdit className="text-secondary" />
</button>
<button onClick={(e) => handleDelete(e, coll.id)}>
    <MdDelete className="text-error" />
</button> */
}
