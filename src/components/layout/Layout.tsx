import { Header } from "./header/Header";
import React from "react";
import { Meta } from "../ceo/Meta";

export default function Layout({
  pageTitle,
  pageDescription,
  children,
}: {
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Meta title={pageTitle} description={pageDescription} />
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
