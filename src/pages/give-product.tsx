import { loadCategories } from "@/api/CategoryApi";
import { Layout } from "@/components/layout/Layout";
import { GiveProductScreen } from "@/components/screens/give-product/GiveProduct";
import { CategoryModel } from "@/models/Category";

type GiveProductProps = {
  categories: CategoryModel[];
};

export default function GiveProduct({ categories }: GiveProductProps) {
  return (
    <Layout
      pageTitle="Share your food"
      pageDescription="Don't let food go to waste, share it with others."
    >
      <GiveProductScreen categories={categories} />
    </Layout>
  );
}

export async function getStaticProps() {
  const categories: CategoryModel[] = await loadCategories();
  return {
    props: {
      categories: categories,
    },
  };
}
