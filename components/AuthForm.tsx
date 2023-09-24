import { signIn } from "next-auth/react";
import React from "react";
import { RiGithubFill, RiGoogleFill } from "react-icons/ri";

const AuthForm = () => {
  const providerLogin = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };
  return (
    <div className="text-primary font-semibold grid grid-cols-2 rounded-lg shadow-lg">
      <div className="col-span-1 text-center bg-primary p-8 text-secondary rounded-l-lg flex flex-col justify-center items-center">
        <h3>Lorem Ipsum</h3>
        <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
      </div>
      <div className="col-span-1 text-left bg-lightHighlight p-8 rounded-r-lg flex flex-col  gap-6">
        <div className="flex justify-between">
          <button className="text-3xl" disabled>
            Login
          </button>
          <button className="text-3xl opacity-40">Sign Up</button>
        </div>
        <form className="mt-4">
          <div>
            <label htmlFor="email" className="block mt-4 text-2xl">
              Email
            </label>
            <input
              type="text"
              placeholder="johndoe@example.com"
              className="basic-input ml-8"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mt-4 text-2xl">
              Password
            </label>
            <input
              type="password"
              placeholder="*****"
              className="basic-input ml-8"
            />
          </div>
          <div className="text-right">
            <button className="px-4 py-2 bg-primary text-secondary rounded-md text-xl font-normal mt-10">
              Login
            </button>
          </div>
        </form>
        <div className="flex justify-around text-xl border border-transparent border-t-primary pt-4">
          <button
            className="flex items-center gap-1"
            onClick={() => providerLogin("google")}
          >
            <RiGoogleFill />
            Google
          </button>
          <button
            className="flex items-center gap-1"
            onClick={() => providerLogin("github")}
          >
            <RiGithubFill />
            Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
