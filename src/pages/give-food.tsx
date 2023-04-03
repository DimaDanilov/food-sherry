import Layout from "@/components/layout/Layout";
import GiveFoodScreen from "@/components/screens/give-food/GiveFood";

export default function GiveFood() {
  return (
    <Layout
      pageTitle="Share your food"
      pageDescription="Don't let food go to waste, share it with others."
    >
      <GiveFoodScreen />
    </Layout>
  );
}
