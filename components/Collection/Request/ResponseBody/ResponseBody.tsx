import React from "react";

const ResponseBody = () => {
  const jsonResponse = JSON.stringify(
    {
      message: "Success",
      requests: [
        {
          id: "6567ce66c2ec75bccd7b0c5c",
          name: "New Request",
          method: "GET",
          path: "/test",
          createdAt: "2023-11-29T23:51:02.239Z",
        },
        {
          id: "6567ce5ac2ec75bccd7b0c58",
          name: "New Request",
          method: "GET",
          path: "/text",
          createdAt: "2023-11-29T23:50:50.366Z",
        },
      ],
    },
    undefined,
    2
  );
  return (
    <div className="">
      <div className="flex justify-between items-center pl-4 py-2">
        <h6>Response</h6>
        <p>
          <span>Status: 200 OK</span>
        </p>
      </div>
      <div className="bg-lightHighlight p-2 pl-4">
        <pre id="json">{jsonResponse}</pre>
      </div>
    </div>
  );
};

export default ResponseBody;
