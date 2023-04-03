import Layout from "@/components/layout/Layout";
import ProductScreen from "@/components/screens/product/Product";

export default function Product() {
  return (
    <Layout
      pageTitle="Product"
      pageDescription="Eat well, waste less, and save more food with foodsharing."
    >
      <ProductScreen />
    </Layout>
  );
}
