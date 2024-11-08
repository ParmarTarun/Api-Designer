import CollectionDetails from "@/components/Collection/SingleCollection/CollectionDetails";
import CollectionLayout from "@/components/Collection/CollectionLayout";
import Layout from "@/components/Shared/Layout";
import { getCollectionByName } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { GetServerSideProps } from "next";
import React from "react";

interface collectionPageProps {
  collectionData: collectionType;
}

const CollectionPage = ({ collectionData }: collectionPageProps) => {
  return (
    <Layout>
      <CollectionLayout>
        <CollectionDetails collectionData={collectionData} />
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
