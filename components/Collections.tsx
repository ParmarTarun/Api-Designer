import { collectionType } from "@/models/Collection";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import CollectionFormModal from "./CollectionFormModal";
import { useCollection } from "@/context/collection";

interface collectionsProps {
  collectionsData: collectionType[];
}

const Collections = ({ collectionsData }: collectionsProps) => {
  const [showModal, setShowModal] = useState(false);
  const { collections, setCollections } = useCollection();

  useEffect(() => setCollections(collectionsData), []);

  return (
    <div className="flex gap-4 flex-wrap bg-primary  p-4 text-primary bg-opacity-50 rounded-md">
      {collections.map((coll, i) => (
        <div className=" rounded-lg bg-secondary " key={i}>
          <div className="px-2 py-1 bg-lightHighlight rounded-t-lg">
            <h5 className="uppercase font-semibold ">{coll.name}</h5>
          </div>
          <div className="py-4 px-2 overflow-x-hidden">
            <p>Url: {coll.baseUrl}</p>
          </div>
        </div>
      ))}
      <button className="w-20" onClick={() => setShowModal(true)}>
        <IoMdAddCircleOutline className="m-auto text-secondary text-2xl" />
      </button>
      {!!showModal && <CollectionFormModal close={() => setShowModal(false)} />}
    </div>
  );
};

export default Collections;
