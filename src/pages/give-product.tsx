import Layout from "@/components/layout/Layout";
import GiveProductScreen from "@/components/screens/give-product/GiveProduct";

export default function GiveProduct() {
  return (
    <Layout
      pageTitle="Share your food"
      pageDescription="Don't let food go to waste, share it with others."
    >
      <GiveProductScreen />
    </Layout>
  );
}
