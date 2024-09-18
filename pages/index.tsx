import GetStarted from "@/components/Home/GetStarted";
import GuestCredsModal from "@/components/Home/GuestCredsModal";
import Layout from "@/components/Shared/Layout";
import { useState } from "react";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Layout>
      <div className="mt-20 flex flex-col justify-center items-center">
        <GetStarted />
        <button className="mt-2" onClick={() => setShowModal(true)}>
          Sign In as guest user?
        </button>
        {!!showModal && <GuestCredsModal close={() => setShowModal(false)} />}
      </div>
    </Layout>
  );
};

export default HomePage;
