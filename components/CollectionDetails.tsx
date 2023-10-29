import React, { useEffect, useState } from "react";
import Requests from "@/components/Requests";
import { useSingleCollection } from "@/context/currentCollection";
import Entities from "@/components/Entities";
import BaseUrl from "@/components/BaseUrl";
import { collectionType } from "@/models/Collection";
import { entityType } from "@/models/Entity";

interface CollectionDetailsProps {
  collectionData: collectionType;
}

const CollectionDetails = ({ collectionData }: CollectionDetailsProps) => {
  const { collection, setCollection } = useSingleCollection();
  const [currentEntity, setCurrentEntity] = useState<entityType | undefined>(
    collection.entities[0]
  );

  useEffect(() => {
    setCollection(collectionData);
  }, []);

  return (
    <div className="text-primary">
      <h3>{collection?.name}</h3>
      <BaseUrl baseUrl={collection.baseUrl} />
      <Entities
        entities={collection.entities}
        currentEntity={currentEntity}
        setCurrentEntity={setCurrentEntity}
      />

      {/* <Requests entity={currentEntity} /> */}
    </div>
  );
};

export default CollectionDetails;
