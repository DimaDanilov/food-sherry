import { Header } from "./header/Header";
import React from "react";
import { Meta } from "../ceo/Meta";

type LayoutProps = {
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
};

export const Layout = ({
  pageTitle,
  pageDescription,
  children,
}: LayoutProps) => {
  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />
      <main>
        <Header />
        {children}
      </main>
    </>
  );
};
