import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";
import SignUpForm from "@/components/SignUpForm";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { RiGithubFill, RiGoogleFill } from "react-icons/ri";

const AuthForm = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  const providerLogin = async (provider: string) => {
    await signIn(provider, { callbackUrl: "/dashboard" });
  };

  const chageToOtherForm = () => {
    setIsLoggingIn(!isLoggingIn);
  };

  return (
    <Layout>
      <div className="mt-20 flex flex-col justify-center items-center">
        <div className="text-primary font-semibold grid grid-cols-2 rounded-lg shadow-lg">
          <div className="col-span-1 text-center bg-primary p-8 text-secondary rounded-l-lg flex flex-col justify-center items-center">
            <h3>Lorem Ipsum</h3>
            <p> Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum</p>
          </div>
          <div className="col-span-1 text-left bg-lightHighlight p-8 rounded-r-lg flex flex-col  gap-6">
            <div className="flex justify-between">
              <button className="text-3xl" disabled>
                {isLoggingIn ? "Login" : "Sign Up"}
              </button>
              <button
                className="text-3xl opacity-40"
                onClick={chageToOtherForm}
              >
                {isLoggingIn ? "Sign Up" : "Login"}
              </button>
            </div>
            {isLoggingIn ? <LoginForm /> : <SignUpForm />}
            {isLoggingIn && (
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
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthForm;
