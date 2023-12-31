import { beautify, isJson } from "@/lib/utils";
import { body } from "@/types";
import React, { FC, useEffect, useState } from "react";

interface bodyProps {
  body: body;
  handleRequestChange: (k: string, v: string) => void;
}

const Body: FC<bodyProps> = ({ body, handleRequestChange }) => {
  const [editing, setEditing] = useState(body.length ? false : true);
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleRequestChange("body", e.target.value);
  };

  const jsonBody = beautify(body) || body;
  const isValidJson = isJson(body);
  useEffect(() => {
    setEditing(body.length ? false : true);
  }, [body]);
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
          <span className="text-error">Body is not a valid json</span>
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
