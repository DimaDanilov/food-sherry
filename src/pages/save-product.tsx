import Layout from "@/components/layout/Layout";
import SaveProductScreen from "@/components/screens/save-product/SaveProduct";
import { loadProducts } from "../api/ProductApi";
import { ProductsData } from "../api/ProductAdapter";
import { ProductSort } from "@/models/Product";

export default function SaveProduct({
  productsData,
  page,
  search,
  sort,
}: {
  productsData: ProductsData;
  page: number;
  search: string;
  sort: ProductSort;
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
        sort={sort}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  let page: number = Number(query["page"]);
  let search = query["search"];
  let sort: string = query["sort"];
  if (!page || page <= 0 || !(sort in ProductSort)) {
    return {
      redirect: {
        destination: "/save-product?page=1&sort=dateup",
        permanent: false,
      },
    };
  }
  const productsData = await loadProducts(page, search, sort);

  return {
    props: {
      productsData,
      page,
      search: search || "",
      sort,
    },
  };
}
