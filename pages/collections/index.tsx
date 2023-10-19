import CollectionFormModal from "@/components/CollectionFormModal";
import CollectionLayout from "@/components/CollectionLayout";
import Collections from "@/components/Collections";
import Layout from "@/components/Layout";
import { CollectionProvider, useCollection } from "@/context/collection";
import { postCollection } from "@/lib/apiCall";
import { getCollections } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { collectionBody } from "@/types";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

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
