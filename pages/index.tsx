import GetStarted from "@/components/Home/GetStarted";
import Layout from "@/components/Shared/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) router.push("/dashboard");
  }, []);

  return (
    <Layout>
      <div className="mt-20 flex flex-col justify-center items-center">
        <GetStarted />
      </div>
    </Layout>
  );
};

export default HomePage;
