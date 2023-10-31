import React, { useEffect, useState } from "react";
import Requests from "@/components/Requests";
import { useCurrentCollection } from "@/context/currentCollection";
import Entities from "@/components/Entities";
import BaseUrl from "@/components/BaseUrl";
import { collectionType } from "@/models/Collection";
import { entityType } from "@/models/Entity";

interface CollectionDetailsProps {
  collectionData: collectionType;
}

const CollectionDetails = ({ collectionData }: CollectionDetailsProps) => {
  const { currentCollection, setCurrentCollection, currentEntity } =
    useCurrentCollection();

  useEffect(() => {
    setCurrentCollection(collectionData);
  }, []);

  return (
    <div className="text-primary">
      <h3>{currentCollection?.name}</h3>
      <BaseUrl baseUrl={currentCollection.baseUrl} />
      <Entities />

      <Requests />
    </div>
  );
};

export default CollectionDetails;
