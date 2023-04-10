import { ProductsData } from "@/api/FoodAdapter";
import { loadOneProduct } from "@/api/FoodRest";
import Layout from "@/components/layout/Layout";
import ProductScreen from "@/components/screens/product/Product";
import { FoodItem } from "@/models/FoodItem";

export default function Product({ product }: { product: FoodItem }) {
  return (
    <Layout
      pageTitle="Product"
      pageDescription="Eat well, waste less, and save more food with foodsharing."
    >
      <ProductScreen product={product} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const response = await fetch("http://localhost:5000/api/product");
  const products: ProductsData = await response.json();

  const paths = products.products.map((product) => ({
    params: { productId: product.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  const product = await loadOneProduct(params.productId);
  return {
    props: {
      product,
    },
  };
}