import BaseUrl from "@/components/BaseUrl";
import CollectionLayout from "@/components/CollectionLayout";
import Entities from "@/components/Entities";
import Layout from "@/components/Layout";
import Requests from "@/components/Requests";
import { getCollectionByName } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

interface collectionPageProps {
  collectionData: collectionType;
}

const CollectionPage = ({ collectionData }: collectionPageProps) => {
  const [collection, setCollection] = useState<collectionType>(collectionData);
  const [selectedEntity, setSelectedEntity] = useState(
    collection.entities[0] || null
  );

  return (
    <Layout>
      <CollectionLayout>
        <div className="text-primary">
          <h3>{collection.name}</h3>
          <BaseUrl baseUrl={collection.baseUrl} />
          <Entities
            entities={collection.entities}
            currentEntity={selectedEntity}
            setEntity={setSelectedEntity}
          />
          <Requests
            requestsData={selectedEntity.requests}
            entityId={selectedEntity.id}
          />
        </div>
      </CollectionLayout>
    </Layout>
  );
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps<
  collectionPageProps
> = async (ctx) => {
  const { collectionName } = ctx.query;
  const collection = await getCollectionByName(
    collectionName?.toString() || ""
  );
  return {
    props: {
      collectionData: JSON.parse(JSON.stringify(collection)),
    },
  };
};
