import React from "react";

const ResponseBody = () => {
  return (
    <div className="">
      <div className="flex justify-between items-center pl-4 py-2">
        <h6>Response</h6>
        <p>
          <span>Status: 200 OK</span>
        </p>
      </div>
      <div className="bg-lightHighlight p-2 pl-4">Response Body</div>
    </div>
  );
};

export default ResponseBody;
