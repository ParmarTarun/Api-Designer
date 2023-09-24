import AuthForm from "@/components/AuthForm";
import GetStarted from "@/components/GetStarted";
import Layout from "@/components/Layout";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <Layout>
      <div className="mt-20 flex flex-col justify-center items-center">
        {!showAuth ? <GetStarted setShowAuth={setShowAuth} /> : <AuthForm />}
      </div>
    </Layout>
  );
};

export default HomePage;
