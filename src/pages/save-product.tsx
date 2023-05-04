import { Layout } from "@/components/layout/Layout";
import { SaveProductScreen } from "@/components/screens/save-product/SaveProduct";
import { loadProducts } from "../api/ProductApi";
import { ProductsShortData } from "../api/ProductAdapter";
import { ProductSortType } from "@/models/Product";
import { loadCategories } from "@/api/CategoryApi";
import { CategoryModel } from "@/models/Category";

type SaveProductProps = {
  productsData: ProductsShortData;
  page: number;
  search: string;
  sort: ProductSortType;
  availableCategories: CategoryModel[];
  categoriesQuery: string[];
};

export default function SaveProduct({
  productsData,
  page,
  search,
  sort,
  availableCategories,
  categoriesQuery,
}: SaveProductProps) {
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

type GetServerSidePropsProps = {
  query: any;
};

export async function getServerSideProps({ query }: GetServerSidePropsProps) {
  let page: number = Number(query["page"]);
  let search = query["search"];
  let sort: string = query["sort"];
  let categoriesQuery: string[] = Array.isArray(query["category"])
    ? query["category"] // If array
    : query["category"] // If it's only one item
    ? [query["category"]]
    : []; // If no items
  if (!page || page <= 0 || !(sort in ProductSortType)) {
    return {
      redirect: {
        destination: "/save-product?page=1&sort=dateup",
        permanent: false,
      },
    };
  }

  let productsData: ProductsShortData;
  try {
    productsData = await loadProducts(
      page,
      search,
      sort,
      categoriesQuery,
      "open"
    );
  } catch (e) {
    console.error(e);
    productsData = {} as ProductsShortData;
  }

  const availableCategories: CategoryModel[] = await loadCategories();

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
