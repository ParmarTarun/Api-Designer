import CollectionLayout from "@/components/CollectionLayout";
import Collections from "@/components/Collections";
import Layout from "@/components/Layout";
import { getCollections } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { GetServerSideProps } from "next";
import React from "react";

interface collectionsPageProps {
  collectionsData: collectionType[];
}

const CollectionsPage = ({ collectionsData }: collectionsPageProps) => {
  return (
    <Layout>
      <CollectionLayout>
        <Collections collectionsData={collectionsData} />
      </CollectionLayout>
    </Layout>
  );
};

export default CollectionsPage;

export const getServerSideProps: GetServerSideProps<
  collectionsPageProps
> = async () => {
  const collectionsData = await getCollections();

  return {
    props: {
      collectionsData: JSON.parse(JSON.stringify(collectionsData)),
    },
  };
};
