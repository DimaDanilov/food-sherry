import Header from "@/components/common/Header";
import Head from "next/head";
import React from "react";
import { Meta } from "../components/ceo/Meta";

export default function PageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Meta title="Food Sherry" description="An app for food sharing" />
      <main>
        <Header />
        {children}
      </main>
    </>
  );
}
