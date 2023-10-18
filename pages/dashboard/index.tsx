import Layout from "@/components/Layout";
import { getCollections } from "@/lib/collections";
import { collectionType } from "@/models/Collection";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

interface dashboardProps {
  collectionsData: collectionType[];
}

const DashboardPage = ({ collectionsData }: dashboardProps) => {
  const [collections, setCollections] = useState(collectionsData);

  return (
    <Layout>
      <>
        <div className="my-2">
          <h2 className="font-medium">Collections</h2>
        </div>
        <div className="flex gap-4 flex-wrap bg-primary  p-4 text-primary bg-opacity-50 rounded-md">
          {collections.map((coll, i) => (
            <div className=" rounded-lg bg-secondary" key={i}>
              <div className="px-2 py-1 bg-lightHighlight rounded-t-lg">
                <h5 className="uppercase font-semibold ">{coll.name}</h5>
              </div>
              <div className="py-4 px-2">
                <p>Url: {coll.baseUrl}</p>
              </div>
            </div>
          ))}
          <button className="w-20">
            <IoMdAddCircleOutline className="m-auto text-secondary text-2xl" />
          </button>
        </div>
      </>
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
