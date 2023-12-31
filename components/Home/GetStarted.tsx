import { useRouter } from "next/router";
import React from "react";

const GetStarted = () => {
  const router = useRouter();
  const handleGetStarted = () => {
    router.push("/collections");
  };
  return (
    <div className="w-4/5 text-center">
      <h2 className="text-4xl font-bold underline mb-4">API Designer</h2>
      <p className="text-2xl my-4">
        An Online tool to design your awesome{" "}
        <span className="font-semibold text-darkHighlight">APIs</span>. Create
        <span className="font-semibold"> Collections</span>,{" "}
        <span className="font-semibold">Entities</span> &{" "}
        <span className="font-semibold">Endpoints</span> along with{" "}
        <span className="font-semibold">Headers</span>,{" "}
        <span className="font-semibold">Authorizations</span>,{" "}
        <span className="font-semibold">Query Params</span> and{" "}
        <span className="font-semibold">Body</span>. Furthermore, design the{" "}
        <span className="font-semibold">Responses</span> as well!
        <br /> Share your work with frontend team and let them know how your
        APIs are going to look, even before you actually develop them!
      </p>
      <button
        className="bg-darkHighlight font-semibold  text-secondary px-4 py-2 rounded-md mt-4 text-2xl"
        onClick={handleGetStarted}
      >
        GET STARTED
      </button>
    </div>
  );
};

export default GetStarted;
