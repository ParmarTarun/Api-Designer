import CollectionLayout from "@/components/Collection/CollectionLayout";
import Collections from "@/components/Collection/Collections";
import Layout from "@/components/Shared/Layout";
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
