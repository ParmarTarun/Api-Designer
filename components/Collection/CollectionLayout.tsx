import { CollectionsProvider } from "@/context/collections";
import { SingleCollectionProvider } from "@/context/currentCollection";
import { ReactChildrenProps } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import Header from "../Shared/Header";

const CollectionLayout = ({ children }: ReactChildrenProps) => {
  const router = useRouter();
  const path = decodeURI(router.asPath).slice(1).split("/");
  return (
    <CollectionsProvider>
      <>
        <Header>
          <div className="flex items-center">
            {path.map((el, i) => {
              const link = path.slice(0, i + 1).join("/");
              return (
                <Link href={`/${link}`} key={i}>
                  {i === 0 ? (
                    <p className="uppercase">{el}</p>
                  ) : (
                    <>
                      <AiFillCaretRight className="inline align-text-top ml-1" />{" "}
                      <p className="uppercase inline">{el}</p>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </Header>

        <SingleCollectionProvider>{children}</SingleCollectionProvider>
      </>
    </CollectionsProvider>
  );
};

export default CollectionLayout;
