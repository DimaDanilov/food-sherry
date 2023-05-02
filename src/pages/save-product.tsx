import Layout from "@/components/layout/Layout";
import SaveProductScreen from "@/components/screens/save-product/SaveProduct";
import { loadProducts } from "../api/ProductApi";
import { ProductsData } from "../api/ProductAdapter";
import { ProductSort } from "@/models/Product";
import { loadCategories } from "@/api/CategoryApi";
import { ICategory } from "@/models/Category";

export default function SaveProduct({
  productsData,
  page,
  search,
  sort,
  availableCategories,
  categoriesQuery,
}: {
  productsData: ProductsData;
  page: number;
  search: string;
  sort: ProductSort;
  availableCategories: ICategory[];
  categoriesQuery: string[];
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
        availableCategories={availableCategories}
        categoriesQuery={categoriesQuery}
      />
    </Layout>
  );
}

export async function getServerSideProps({ query }: { query: any }) {
  let page: number = Number(query["page"]);
  let search = query["search"];
  let sort: string = query["sort"];
  let categoriesQuery: string[] = Array.isArray(query["category"])
    ? query["category"] // If array
    : query["category"] // If it's only one item
    ? [query["category"]]
    : []; // If no items
  if (!page || page <= 0 || !(sort in ProductSort)) {
    return {
      redirect: {
        destination: "/save-product?page=1&sort=dateup",
        permanent: false,
      },
    };
  }

  const productsData: ProductsData = await loadProducts(
    page,
    search,
    sort,
    categoriesQuery,
    "open"
  );
  const availableCategories: ICategory[] = await loadCategories();

  return {
    props: {
      productsData,
      page,
      search: search || "",
      sort,
      availableCategories,
      categoriesQuery,
    },
  };
}
