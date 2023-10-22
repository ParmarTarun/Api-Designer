import BaseUrl from "@/components/BaseUrl";
import CollectionLayout from "@/components/CollectionLayout";
import Entities from "@/components/Entities";
import Layout from "@/components/Layout";
import Requests from "@/components/Requests";
import { getCollectionByName } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { requestBody } from "@/types";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

interface collectionPageProps {
  collectionData: collectionType;
}

const CollectionPage = ({ collectionData }: collectionPageProps) => {
  const requests: requestBody[] = [
    {
      entityId: "",
      name: "Fetch all products",
      method: "GET",
      path: "/products",
    },
    {
      entityId: "",
      name: "Remove a product",
      method: "DELETE",
      path: "/products",
    },
    {
      entityId: "",
      name: "Fetch a product",
      method: "GET",
      path: "/product/:pId",
    },
    {
      entityId: "",
      name: "Create a product",
      method: "POST",
      path: "/products",
    },
    {
      entityId: "",
      name: "Update a product",
      method: "PATCH",
      path: "/products/:pId",
    },
    {
      entityId: "",
      name: "Remove a service",
      method: "DELETE",
      path: "/services/:sId",
    },
    {
      entityId: "",
      name: "Fetch a service",
      method: "GET",
      path: "/service/:sId",
    },
    {
      entityId: "",
      name: "Update a service",
      method: "PATCH",
      path: "/services/:sId",
    },
    {
      entityId: "",
      name: "Create a service",
      method: "POST",
      path: "/services",
    },
    {
      entityId: "",
      name: "Fetch all services",
      method: "GET",
      path: "/services",
    },
  ];
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
