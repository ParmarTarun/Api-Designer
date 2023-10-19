import BaseUrl from "@/components/BaseUrl";
import CollectionLayout from "@/components/CollectionLayout";
import Layout from "@/components/Layout";
import Requests from "@/components/Requests";
import { getCollectionByName } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { GetServerSideProps } from "next";
import React from "react";

interface collectionPageProps {
  collection: collectionType;
}

const CollectionPage = ({ collection }: collectionPageProps) => {
  return (
    <Layout>
      <CollectionLayout>
        <div className="text-primary">
          <h3>{collection.name}</h3>
          <BaseUrl baseUrl={collection.baseUrl} />
          <Requests />
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
      collection: JSON.parse(JSON.stringify(collection)),
    },
  };
};
