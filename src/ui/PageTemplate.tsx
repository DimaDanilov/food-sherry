import Header from "@/components/common/Header";
import React from "react";
import { Meta } from "../components/ceo/Meta";

export default function PageTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Meta title="Sherry" description="An app for food sharing" />
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
