import { signIn } from "next-auth/react";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <form className="mt-4">
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
      <div className="text-right">
        <button
          className="px-4 py-2 bg-primary text-secondary rounded-md text-xl font-normal mt-10"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
