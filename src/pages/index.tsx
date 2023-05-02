import { Layout } from "@/components/layout/Layout";
import { HomeScreen } from "@/components/screens/home/Home";

export default function Home() {
  return (
    <Layout
      pageTitle="Sherry"
      pageDescription="Welcome to our food sharing website! Join us in the fight against food waste by sharing your excess food with others. Connect with like-minded individuals and make a positive impact on the environment and your community."
    >
      <HomeScreen />
    </Layout>
  );
}
