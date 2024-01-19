import React, { useEffect, useState } from "react";
import Requests from "../Request/Requests";
import { useCurrentCollection } from "@/context/currentCollection";
import Entities from "../Entity/Entities";
import BaseUrl from "./BaseUrl";
import { collectionType } from "@/models/Collection";
import { FaShare } from "react-icons/fa";
import ShareCollectionModal from "./ShareCollectionModal";

interface CollectionDetailsProps {
  collectionData: collectionType;
}

const CollectionDetails = ({ collectionData }: CollectionDetailsProps) => {
  const { currentCollection, setCurrentCollection } = useCurrentCollection();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCurrentCollection(collectionData);
  }, []);

  return (
    <div className="text-primary">
      <div className="flex justify-between items-center pr-4">
        <div>
          <h3>{currentCollection?.name}</h3> <span>An example API design</span>
        </div>
        <div className="flex gap-2 text-2xl">
          <button className="text-primary" onClick={() => setShowModal(true)}>
            <FaShare />
          </button>
        </div>
      </div>
      <BaseUrl baseUrl={currentCollection.baseUrl} />
      <Entities />
      {!!currentCollection.entities.length && <Requests />}
      {!!showModal && (
        <ShareCollectionModal
          close={() => setShowModal(false)}
          collection={currentCollection}
        />
      )}
    </div>
  );
};

export default CollectionDetails;
