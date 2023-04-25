import Layout from "@/components/layout/Layout";
import SaveProductScreen from "@/components/screens/save-product/SaveProduct";
import { loadProducts } from "../api/ProductApi";
import { ProductsData } from "../api/ProductAdapter";

export default function SaveProduct({
  productsData,
  page,
  search,
}: {
  productsData: ProductsData;
  page: number;
  search: string;
}) {
  return (
    <Layout
      pageTitle="Food catalog"
      pageDescription="No food should go to waste, let's share the taste."
    >
      <SaveProductScreen
        productsData={productsData}
        page={page}
        search={search}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  let page = Number(query["page"]);
  let search = query["search"] || "";
  if (!page || page <= 0) {
    return {
      redirect: {
        destination: "/save-product?page=1",
        permanent: false,
      },
    };
  }

  const productsData = await loadProducts(page, search);

  return {
    props: {
      productsData,
      page,
      search,
    },
  };
}
