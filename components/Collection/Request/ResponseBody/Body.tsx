import { beautify, isJson } from "@/lib/utils";
import { response } from "@/types";
import React, { FC, useState } from "react";

interface bodyProps {
  response: response;
  handleRequestChange: (k: string, v: any) => void;
}

const Body: FC<bodyProps> = ({ response, handleRequestChange }) => {
  const body = response.content;
  const [editing, setEditing] = useState(body.length ? false : true);
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleRequestChange("response", {
      content: e.target.value,
      status: response.status,
    });
  };

  const jsonBody = beautify(body) || body;
  const isValidJson = isJson(body);
  return (
    <div className="grid grid-cols-6">
      <div className="col-span-5">
        <div className="mt-2 " onDoubleClick={() => setEditing(true)}>
          {editing ? (
            <textarea
              value={body}
              rows={10}
              className="w-full basic-input"
              onChange={handleBodyChange}
            />
          ) : (
            <pre id="json">{jsonBody}</pre>
          )}
        </div>
        {!isValidJson && body && (
          <span className="text-error">Response is not a valid json</span>
        )}
        <br />
        {!editing && (
          <span className="text-primary italic">
            Double click to start editing
          </span>
        )}
      </div>
      {editing && (
        <div className="col-span-1 ml-auto">
          <button
            className={`btn-darkHighlight ${
              isValidJson ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            onClick={() => setEditing(false)}
            disabled={!isValidJson}
          >
            Beautify
          </button>
        </div>
      )}
    </div>
  );
};

export default Body;
