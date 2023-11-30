import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axios.post("/api/auth/signup", { email, name, password });
    // login user if sign up success
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };
  return (
    <form className="mt-4">
      <div>
        <label htmlFor="name" className="block mt-4 text-2xl">
          Name
        </label>
        <input
          type="text"
          placeholder="johndoe"
          className="basic-input ml-8"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email" className="block mt-4 text-2xl">
          Email
        </label>
        <input
          type="text"
          placeholder="johndoe@example.com"
          className="basic-input ml-8"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block mt-4 text-2xl">
          Repeat Password
        </label>
        <input
          type="password"
          placeholder="*****"
          className="basic-input ml-8"
        />
      </div>
      <div className="text-right">
        <button
          className="px-4 py-2 bg-primary text-secondary rounded-md text-xl font-normal mt-10"
          onClick={handleSignup}
        >
          SignUp
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
