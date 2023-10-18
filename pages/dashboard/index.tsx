import Layout from "@/components/Layout";
import React from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

const DashboardPage = () => {
  const collections = [
    { name: "Collection 1", baseUrl: "https://collection1.com/api" },
    { name: "Collection 2", baseUrl: "https://collection2.com/api" },
    { name: "Collection 3", baseUrl: "https://collection3.com/api" },
    { name: "Collection 4", baseUrl: "https://collection4.com/api" },
    { name: "Collection 5", baseUrl: "https://collection5.com/api" },
    { name: "Collection 6", baseUrl: "https://collection6.com/api" },
  ];
  return (
    <Layout>
      <>
        <div className="my-2">
          <h2 className="font-medium">Collections</h2>
        </div>
        <div className="flex gap-4 flex-wrap bg-primary  p-4 text-primary bg-opacity-50 rounded-md">
          {collections.map((coll) => (
            <div className=" rounded-lg bg-secondary">
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
