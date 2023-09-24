import AuthForm from "@/components/AuthForm";
import GetStarted from "@/components/GetStarted";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const switchToAuthForm = () => {
    setShowAuth(true);
  };
  useEffect(() => {
    if (session) router.push("/dashboard");
  }, []);

  return (
    <Layout>
      <div className="mt-20 flex flex-col justify-center items-center">
        {!showAuth ? (
          <GetStarted switchToAuthForm={switchToAuthForm} />
        ) : (
          <AuthForm />
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
