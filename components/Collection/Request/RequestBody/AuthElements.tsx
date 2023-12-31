import { FC, useEffect, useState } from "react";

interface authElementProps {
  cValue: any;
  setCValue: (p: any) => void;
}

export const NoAuthElement: FC<authElementProps> = ({ setCValue }) => {
  useEffect(() => setCValue(""));
  return <></>;
};
export const BearerTokenElement: FC<authElementProps> = ({
  cValue,
  setCValue,
}) => {
  const [value, setValue] = useState(cValue);
  useEffect(() => {
    setValue({ token: cValue["token"] || "" });
  }, [cValue]);
  return (
    <>
      <h6>Token:</h6>
      <input
        className="basic-input ml-4"
        placeholder="your token here..."
        value={value["token"] || ""}
        onChange={(e) => {
          setCValue({ token: e.target.value });
          setValue({ token: e.target.value });
        }}
      />
    </>
  );
};
