import { collectionType } from "@/models/Collection";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import CollectionFormModal from "./CollectionFormModal";
import { useCollections } from "@/context/collections";
import { deleteCollection } from "@/lib/apiCall";
import Link from "next/link";
import MenuOptions from "./menuOptions";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface collectionsProps {
  collectionsData: collectionType[];
}

const Collections = ({ collectionsData }: collectionsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingColelction] = useState<
    collectionType | undefined
  >();
  const { collections, setCollections } = useCollections();

  const handleModalClose = () => {
    setEditingColelction(undefined);
    setShowModal(false);
  };

  const handleDelete = (collId: string) => {
    if (!confirm("Are you sure:")) return;
    deleteCollection(collId)
      .then(() =>
        setCollections(collections.filter((coll) => coll.id !== collId))
      )
      .catch((e) => {
        alert(e.response.data.message);
        console.log(e);
      });
  };

  const handleEdit = (collId: string) => {
    const coll = collections.find((col) => col.id === collId);
    setEditingColelction(coll);
    setShowModal(true);
  };
  const options = [
    {
      name: "Edit",
      icon: <MdModeEdit />,
      callback: handleEdit,
    },
    {
      name: "Delete",
      icon: <MdDelete className="text-error" />,
      callback: handleDelete,
    },
  ];

  useEffect(() => setCollections(collectionsData), []);

  return (
    <div className="flex gap-4 flex-wrap p-4">
      {collections.map((coll, i) => (
        <Link href={`/collections/${coll.name}`} key={i}>
          <div className=" rounded-lg bg-lightHighlight">
            <div className="text-secondary bg-primary rounded-t-lg grid grid-cols-5 px-2">
              <h5 className="text-lg col-span-4 py-2">{coll.name}</h5>
              <MenuOptions id={coll.id} options={options} />
            </div>
            <div className="py-2 px-4 font-semibold overflow-x-hidden text-primary">
              <h6 className="italic">{coll.baseUrl}</h6>
            </div>
          </div>
        </Link>
      ))}
      <button className="w-20" onClick={() => setShowModal(true)}>
        <IoMdAddCircleOutline className="m-auto text-primary text-2xl" />
      </button>
      {collections.length === 0 && (
        <p className="text-primary">Add a collection</p>
      )}
      {!!showModal && (
        <CollectionFormModal
          close={handleModalClose}
          collection={editingCollection}
        />
      )}
    </div>
  );
};

export default Collections;
