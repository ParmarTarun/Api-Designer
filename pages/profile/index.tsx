import Header from "@/components/Shared/Header";
import Layout from "@/components/Shared/Layout";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const ProfilePage = () => {
  return (
    <Layout>
      <Header>
        <div className="flex justify-between items-center">
          <p className="uppercase">Profile</p>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonPopoverCard:
                  "bg-lightHighlight text-primary font-bold mt-2",
              },
            }}
          />
        </div>
      </Header>
    </Layout>
  );
};

export default ProfilePage;
