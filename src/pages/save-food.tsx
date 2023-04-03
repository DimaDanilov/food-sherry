import Layout from "@/components/layout/Layout";
import SaveFoodScreen from "@/components/screens/save-food/SaveFood";

export default function SaveFood() {
  return (
    <Layout
      pageTitle="Food catalog"
      pageDescription="No food should go to waste, let's share the taste."
    >
      <SaveFoodScreen />
    </Layout>
  );
}
