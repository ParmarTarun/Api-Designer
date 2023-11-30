import React, { useEffect, useState } from "react";
import Requests from "@/components/Requests";
import { useCurrentCollection } from "@/context/currentCollection";
import Entities from "@/components/Entities";
import BaseUrl from "@/components/BaseUrl";
import { collectionType } from "@/models/Collection";
import { FaShare } from "react-icons/fa";
import { MdDelete, MdModeEdit } from "react-icons/md";

interface CollectionDetailsProps {
  collectionData: collectionType;
}

const CollectionDetails = ({ collectionData }: CollectionDetailsProps) => {
  const { currentCollection, setCurrentCollection } = useCurrentCollection();

  useEffect(() => {
    setCurrentCollection(collectionData);
  }, []);

  return (
    <div className="text-primary">
      <div className="flex justify-between items-center pr-4">
        <h3>{currentCollection?.name}</h3>
        <div className="flex gap-2 text-2xl">
          <button className="text-primary">
            <FaShare />
          </button>
          |
          <button className="text-primary">
            <MdModeEdit />
          </button>
          |
          <button className="text-error">
            <MdDelete />
          </button>
        </div>
      </div>
      <BaseUrl baseUrl={currentCollection.baseUrl} />
      <Entities />
      {!!currentCollection.entities.length && <Requests />}
    </div>
  );
};

export default CollectionDetails;
