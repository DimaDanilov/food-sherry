import Layout from "@/components/layout/Layout";
import RegisterScreen from "@/components/screens/register/Register";

export default function Register() {
  return (
    <Layout
      pageTitle="Register"
      pageDescription="Connect with people who care about reducing food waste and making a difference. Register with our foodsharing website today."
    >
      <RegisterScreen />
    </Layout>
  );
}
