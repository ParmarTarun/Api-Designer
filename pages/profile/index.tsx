import Layout from "@/components/Shared/Layout";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  return (
    <Layout>
      <>
        <div className="mt-2 mb-4">
          <div className="flex bg-primary rounded-md px-4 py-2 text-secondary font-semibold justify-between items-center ">
            <p className="uppercase">Profile</p>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </>
    </Layout>
  );
};

export default ProfilePage;
