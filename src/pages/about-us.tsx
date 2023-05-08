import { Layout } from "@/components/layout/Layout";
import { AboutUsScreen } from "@/components/screens/about-us/AboutUs";

export default function AboutUs() {
  return (
    <Layout
      pageTitle="About Us"
      pageDescription="At Food Sharing, we believe in creating a sustainable future by reducing food waste. Learn about our approach and find out how you can support our cause."
    >
      <AboutUsScreen />
    </Layout>
  );
}
