import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

const GetStarted = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleGetStarted = () => {
    router.push("/auth");
  };
  const handleGuestLogin = () => {
    setIsLoading(true);
    signIn("credentials", {
      email: "johndoe@example.com",
      password: "1234",
      redirect: false,
    })
      .then((res) => {
        router.push("/collections");
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };
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
        onClick={handleGetStarted}
      >
        GET STARTED
      </button>
      <div>
        {isLoading ? (
          <ScaleLoader className="sm:my-10 my-5" />
        ) : (
          <button
            className="bg-primary font-semibold uppercase text-secondary px-4 py-2 rounded-md mt-4"
            onClick={handleGuestLogin}
          >
            Try as a guest
          </button>
        )}
      </div>
    </div>
  );
};

export default GetStarted;
