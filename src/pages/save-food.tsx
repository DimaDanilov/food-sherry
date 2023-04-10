import Layout from "@/components/layout/Layout";
import SaveFoodScreen from "@/components/screens/save-food/SaveFood";
import { loadAllProducts } from "./api/FoodRest";
import { ProductsData } from "./api/FoodAdapter";

export default function SaveFood({
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
      <SaveFoodScreen productsData={productsData} page={page} search={search} />
    </Layout>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  let page = Number(query["page"]);
  let search = query["search"] || "";
  if (!page || page <= 0) {
    return {
      redirect: {
        destination: "/save-food?page=1",
        permanent: false,
      },
    };
  }

  const productsData = await loadAllProducts(page, search);

  return {
    props: {
      productsData,
      page,
      search,
    },
  };
}
