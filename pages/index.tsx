import GetStarted from "@/components/Home/GetStarted";
import Layout from "@/components/Shared/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="mt-20 flex flex-col justify-center items-center">
        <GetStarted />
      </div>
    </Layout>
  );
};

export default HomePage;
