import BaseUrl from "@/components/BaseUrl";
import CollectionLayout from "@/components/CollectionLayout";
import Entities from "@/components/Entities";
import Layout from "@/components/Layout";
import Requests from "@/components/Requests";
import { getCollectionByName } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { requestBody } from "@/types";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface collectionPageProps {
  collectionData: collectionType;
}

const CollectionPage = ({ collectionData }: collectionPageProps) => {
  const entities = ["product", "service"];
  const requests: requestBody[] = [
    { name: "Fetch all products", method: "GET", path: "/products" },
    { name: "Remove a product", method: "DELETE", path: "/products" },
    { name: "Fetch a product", method: "GET", path: "/product/:pId" },
    { name: "Create a product", method: "POST", path: "/products" },
    { name: "Update a product", method: "PATCH", path: "/products/:pId" },
    { name: "Remove a service", method: "DELETE", path: "/services/:sId" },
    { name: "Fetch a service", method: "GET", path: "/service/:sId" },
    { name: "Update a service", method: "PATCH", path: "/services/:sId" },
    { name: "Create a service", method: "POST", path: "/services" },
    { name: "Fetch all services", method: "GET", path: "/services" },
  ];
  const [collection, setCollection] = useState<collectionType>(collectionData);
  const [selectedEntity, setSelectedEntity] = useState(entities[0]);

  return (
    <Layout>
      <CollectionLayout>
        <div className="text-primary">
          <h3>{collection.name}</h3>
          <BaseUrl baseUrl={collection.baseUrl} />
          <Entities
            entities={entities}
            currentEntity={selectedEntity}
            setEntity={setSelectedEntity}
          />
          <Requests requests={requests} />
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
