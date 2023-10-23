import { CollectionsProvider } from "@/context/collections";
import { ReactChildrenProps } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiFillCaretRight } from "react-icons/ai";

const CollectionLayout = ({ children }: ReactChildrenProps) => {
  const router = useRouter();
  const path = decodeURI(router.asPath).slice(1).split("/");
  return (
    <CollectionsProvider>
      <>
        <div className="mt-2 mb-4">
          <div className="flex bg-primary rounded-md p-2 text-secondary font-semibold ">
            {path.map((el, i) => {
              const link = path.slice(0, i + 1).join("/");
              return (
                <Link href={`/${link}`} className="ml-4" key={i}>
                  {i === 0 ? (
                    <p className="uppercase">{el}</p>
                  ) : (
                    <>
                      <AiFillCaretRight className="inline" />{" "}
                      <p className="uppercase inline">{el}</p>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
        <div>{children}</div>
      </>
    </CollectionsProvider>
  );
};

export default CollectionLayout;
