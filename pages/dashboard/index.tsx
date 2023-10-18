import CollectionFormModal from "@/components/CollectionFormModal";
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

interface dashboardProps {
  collectionsData: collectionType[];
}

const DashboardPage = ({ collectionsData }: dashboardProps) => {
  return (
    <Layout>
      <CollectionProvider>
        <>
          <div className="my-2">
            <h2 className="font-medium">Collections</h2>
          </div>
          <Collections collectionsData={collectionsData} />
        </>
      </CollectionProvider>
    </Layout>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps<
  dashboardProps
> = async () => {
  const collectionsData = await getCollections();

  return {
    props: {
      collectionsData: JSON.parse(JSON.stringify(collectionsData)),
    },
  };
};
