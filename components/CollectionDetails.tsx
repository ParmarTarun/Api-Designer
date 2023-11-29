import React, { useEffect, useState } from "react";
import Requests from "@/components/Requests";
import { useCurrentCollection } from "@/context/currentCollection";
import Entities from "@/components/Entities";
import BaseUrl from "@/components/BaseUrl";
import { collectionType } from "@/models/Collection";

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
      <h3>{currentCollection?.name}</h3>
      <BaseUrl baseUrl={currentCollection.baseUrl} />
      <Entities />
      {!!currentCollection.entities.length && <Requests />}
    </div>
  );
};

export default CollectionDetails;
