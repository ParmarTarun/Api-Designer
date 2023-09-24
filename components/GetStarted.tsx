import React from "react";

interface GetStartedProps {
  switchToAuthForm: () => void;
}

const GetStarted = ({ switchToAuthForm }: GetStartedProps) => {
  return (
    <div className="w-4/5 text-center">
      <h2 className="text-4xl font-bold underline mb-4">API Designer</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quistailz nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat.
      </p>
      <button
        className="bg-darkHighlight font-semibold  text-secondary px-4 py-2 rounded-md mt-4"
        onClick={switchToAuthForm}
      >
        GET STARTED
      </button>
    </div>
  );
};

export default GetStarted;
